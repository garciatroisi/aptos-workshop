module galactic_wars::galactic_wars {
    use std::signer;
    use std::string::{Self, String};
    use std::vector;
    use aptos_framework::account;
    use aptos_framework::timestamp;
    use aptos_framework::coin::{Self, Coin};
    use aptos_framework::aptos_coin::AptosCoin;
    use aptos_token::token;
    use aptos_token::token_id::{Self, TokenId};
    use aptos_token::property_map::{Self, PropertyMap};
    use aptos_std::table::{Self, Table};
    use aptos_std::simple_map::{Self, SimpleMap};

    // Error codes
    const ENOT_AUTHORIZED: u64 = 1;
    const EINSUFFICIENT_BALANCE: u64 = 2;
    const ECHARACTER_NOT_FOUND: u64 = 3;
    const EINVALID_BATTLE: u64 = 4;
    const ECOLLECTION_NOT_CREATED: u64 = 5;

    // Character types
    const CHARACTER_ALIEN: u64 = 1;
    const CHARACTER_ASTRONAUT: u64 = 2;
    const CHARACTER_ROBOT: u64 = 3;

    // Battle constants
    const BATTLE_COST: u64 = 1000000; // 0.001 APT

    struct Character has store, drop {
        id: u64,
        character_type: u64,
        power: u64,
        defense: u64,
        owner: address,
        token_id: TokenId,
    }

    struct Battle has store, drop {
        id: u64,
        challenger: address,
        opponent: address,
        challenger_token_id: TokenId,
        opponent_token_id: TokenId,
        winner: address,
        timestamp: u64,
    }

    struct GalacticWars has key {
        characters: Table<address, vector<Character>>,
        battles: Table<u64, Battle>,
        battle_counter: u64,
        collection_created: SimpleMap<address, bool>,
    }

    struct CharacterCapability has key {
        burn_cap: token::BurnCapability<GalacticWarsToken>,
        mint_cap: token::MintCapability<GalacticWarsToken>,
        freeze_cap: token::FreezeCapability<GalacticWarsToken>,
    }

    struct GalacticWarsToken has key {}

    public entry fun initialize(account: &signer) {
        let account_addr = signer::address_of(account);
        
        // Initialize the main resource
        move_to(account, GalacticWars {
            characters: table::new(),
            battles: table::new(),
            battle_counter: 0,
            collection_created: simple_map::create(),
        });

        // Create token capabilities
        let (burn_cap, freeze_cap, mint_cap) = token::initialize_token_store(account);
        
        move_to(account, CharacterCapability {
            burn_cap,
            mint_cap,
            freeze_cap,
        });
    }

    public entry fun create_collection(account: &signer) {
        let account_addr = signer::address_of(account);
        
        // Create the collection
        token::create_collection(
            account,
            string::utf8(b"Galactic Wars Characters"),
            string::utf8(b"Intergalactic warriors ready for battle"),
            string::utf8(b"https://galactic-wars.com/collection"),
            0, // unlimited supply
            vector<bool>[false, false, false], // mutable settings
        );

        // Mark collection as created
        let galactic_wars = borrow_global_mut<GalacticWars>(@galactic_wars);
        simple_map::add(&mut galactic_wars.collection_created, account_addr, true);
    }

    public entry fun mint_character(
        account: &signer,
        character_type: u64,
        name: String,
        description: String,
        image_uri: String,
    ) acquires GalacticWars, CharacterCapability {
        let account_addr = signer::address_of(account);
        
        // Verify collection is created
        let galactic_wars = borrow_global<GalacticWars>(@galactic_wars);
        assert!(simple_map::contains_key(&galactic_wars.collection_created, &account_addr), ECOLLECTION_NOT_CREATED);
        
        // Generate character attributes based on type
        let (power, defense) = get_character_attributes(character_type);
        
        // Create token properties
        let token_properties = property_map::create();
        property_map::add(&mut token_properties, &string::utf8(b"character_type"), &character_type);
        property_map::add(&mut token_properties, &string::utf8(b"power"), &power);
        property_map::add(&mut token_properties, &string::utf8(b"defense"), &defense);
        property_map::add(&mut token_properties, &string::utf8(b"owner"), &account_addr);
        
        // Mint the token
        let token_id = token::create_tokendata(
            account,
            string::utf8(b"Galactic Wars Characters"),
            name,
            description,
            image_uri,
            1, // supply
            string::utf8(b""), // royalty payee
            0, // royalty points denominator
            0, // royalty points numerator
            token_properties,
            vector<bool>[false, false, false, false, false], // token mutability
        );

        // Mint the actual token
        let capability = borrow_global<CharacterCapability>(@galactic_wars);
        let token = token::mint(&capability.mint_cap, account_addr, token_id, 1);
        
        // Store character data
        let galactic_wars = borrow_global_mut<GalacticWars>(@galactic_wars);
        let character = Character {
            id: timestamp::now_seconds(),
            character_type,
            power,
            defense,
            owner: account_addr,
            token_id,
        };

        if (!table::contains(&galactic_wars.characters, account_addr)) {
            table::add(&mut galactic_wars.characters, account_addr, vector::empty());
        };
        
        let characters = table::borrow_mut(&mut galactic_wars.characters, account_addr);
        vector::push_back(characters, character);
    }

    public entry fun battle(
        challenger: &signer,
        opponent_address: address,
        challenger_token_index: u64,
        opponent_token_index: u64,
    ) acquires GalacticWars, CharacterCapability {
        let challenger_addr = signer::address_of(challenger);
        
        // Get character data
        let galactic_wars = borrow_global_mut<GalacticWars>(@galactic_wars);
        
        let challenger_characters = table::borrow(&galactic_wars.characters, challenger_addr);
        let opponent_characters = table::borrow(&galactic_wars.characters, opponent_address);
        
        assert!(vector::length(challenger_characters) > challenger_token_index, ECHARACTER_NOT_FOUND);
        assert!(vector::length(opponent_characters) > opponent_token_index, ECHARACTER_NOT_FOUND);
        
        let challenger_char = vector::borrow(challenger_characters, challenger_token_index);
        let opponent_char = vector::borrow(opponent_characters, opponent_token_index);
        
        // Calculate battle result
        let challenger_score = challenger_char.power + challenger_char.defense + get_random_factor();
        let opponent_score = opponent_char.power + opponent_char.defense + get_random_factor();
        
        let winner_addr = if (challenger_score >= opponent_score) {
            challenger_addr
        } else {
            opponent_address
        };
        
        let loser_addr = if (winner_addr == challenger_addr) {
            opponent_address
        } else {
            challenger_addr
        };
        
        let loser_token_id = if (winner_addr == challenger_addr) {
            opponent_char.token_id
        } else {
            challenger_char.token_id
        };
        
        // Burn the losing character
        let capability = borrow_global<CharacterCapability>(@galactic_wars);
        token::burn(&capability.burn_cap, loser_addr, loser_token_id, 1);
        
        // Remove from characters list
        let characters = table::borrow_mut(&mut galactic_wars.characters, loser_addr);
        let index_to_remove = if (winner_addr == challenger_addr) {
            opponent_token_index
        } else {
            challenger_token_index
        };
        vector::remove(characters, index_to_remove);
        
        // Record battle
        let battle = Battle {
            id: galactic_wars.battle_counter,
            challenger: challenger_addr,
            opponent: opponent_address,
            challenger_token_id: challenger_char.token_id,
            opponent_token_id: opponent_char.token_id,
            winner: winner_addr,
            timestamp: timestamp::now_seconds(),
        };
        
        table::add(&mut galactic_wars.battles, galactic_wars.battle_counter, battle);
        galactic_wars.battle_counter = galactic_wars.battle_counter + 1;
    }

    // Helper functions
    fun get_character_attributes(character_type: u64): (u64, u64) {
        if (character_type == CHARACTER_ALIEN) {
            (85, 70) // High power, medium defense
        } else if (character_type == CHARACTER_ASTRONAUT) {
            (70, 85) // Medium power, high defense
        } else if (character_type == CHARACTER_ROBOT) {
            (80, 80) // Balanced
        } else {
            (50, 50) // Default
        }
    }

    fun get_random_factor(): u64 {
        // Simple pseudo-random based on timestamp
        // In production, use a proper random number generator
        timestamp::now_seconds() % 50
    }

    // View functions
    public fun get_characters(owner: address): vector<Character> acquires GalacticWars {
        let galactic_wars = borrow_global<GalacticWars>(@galactic_wars);
        if (table::contains(&galactic_wars.characters, owner)) {
            *table::borrow(&galactic_wars.characters, owner)
        } else {
            vector::empty()
        }
    }

    public fun get_battle(battle_id: u64): Battle acquires GalacticWars {
        let galactic_wars = borrow_global<GalacticWars>(@galactic_wars);
        *table::borrow(&galactic_wars.battles, battle_id)
    }

    public fun get_battle_count(): u64 acquires GalacticWars {
        let galactic_wars = borrow_global<GalacticWars>(@galactic_wars);
        galactic_wars.battle_counter
    }

    public fun has_collection(owner: address): bool acquires GalacticWars {
        let galactic_wars = borrow_global<GalacticWars>(@galactic_wars);
        simple_map::contains_key(&galactic_wars.collection_created, &owner)
    }
}
