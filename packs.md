
<a id="0x123_packs"></a>

# Module `0x123::packs`

UFC Strike Packs Module

This module provides functionality for creating, managing, and opening NFT packs.
It supports pre-orders, pack distribution, moment minting, and pack opening mechanics.
The module includes admin controls, pack configuration, and distribution management.


-  [Struct `PreOrder`](#0x123_packs_PreOrder)
-  [Struct `PackInfo`](#0x123_packs_PackInfo)
-  [Resource `Pack`](#0x123_packs_Pack)
-  [Resource `AdminTable`](#0x123_packs_AdminTable)
-  [Resource `PackStore`](#0x123_packs_PackStore)
-  [Struct `MomentDrawnEvent`](#0x123_packs_MomentDrawnEvent)
-  [Struct `PacksRemovedFromSaleEvent`](#0x123_packs_PacksRemovedFromSaleEvent)
-  [Constants](#@Constants_0)
-  [Function `add_admin`](#0x123_packs_add_admin)
    -  [Arguments](#@Arguments_1)
-  [Function `remove_admin`](#0x123_packs_remove_admin)
    -  [Arguments](#@Arguments_2)
-  [Function `create_pack`](#0x123_packs_create_pack)
    -  [Arguments](#@Arguments_3)
-  [Function `add_collections_to_distribution`](#0x123_packs_add_collections_to_distribution)
    -  [Arguments](#@Arguments_4)
-  [Function `add_serial_numbers`](#0x123_packs_add_serial_numbers)
-  [Function `add_serial_numbers_with_range`](#0x123_packs_add_serial_numbers_with_range)
-  [Function `mint_packs_batch`](#0x123_packs_mint_packs_batch)
-  [Function `set_max_purchase`](#0x123_packs_set_max_purchase)
-  [Function `set_max_preorder`](#0x123_packs_set_max_preorder)
-  [Function `set_pack_price`](#0x123_packs_set_pack_price)
-  [Function `set_reserved_packs`](#0x123_packs_set_reserved_packs)
-  [Function `pre_order`](#0x123_packs_pre_order)
    -  [Arguments](#@Arguments_5)
-  [Function `assign_pre_order`](#0x123_packs_assign_pre_order)
-  [Function `set_preorder_enabled`](#0x123_packs_set_preorder_enabled)
-  [Function `preorder_release_batch`](#0x123_packs_preorder_release_batch)
-  [Function `release_pack`](#0x123_packs_release_pack)
-  [Function `remove_pack_from_sale_by_address`](#0x123_packs_remove_pack_from_sale_by_address)
-  [Function `remove_packs_from_sale_by_quantity`](#0x123_packs_remove_packs_from_sale_by_quantity)
-  [Function `remove_serial_numbers_global`](#0x123_packs_remove_serial_numbers_global)
-  [Function `remove_serial_numbers_reserved`](#0x123_packs_remove_serial_numbers_reserved)
-  [Function `purchase`](#0x123_packs_purchase)
    -  [Arguments](#@Arguments_6)
-  [Function `assign_purchase`](#0x123_packs_assign_purchase)
-  [Function `open`](#0x123_packs_open)
    -  [Arguments](#@Arguments_7)
-  [Function `is_address_admin`](#0x123_packs_is_address_admin)
    -  [Arguments](#@Arguments_8)
    -  [Returns](#@Returns_9)
-  [Function `is_address_owner`](#0x123_packs_is_address_owner)
    -  [Arguments](#@Arguments_10)
    -  [Returns](#@Returns_11)
-  [Function `get_owner`](#0x123_packs_get_owner)
    -  [Returns](#@Returns_12)
-  [Function `get_packs_for_sale_available`](#0x123_packs_get_packs_for_sale_available)
-  [Function `get_remaining_packs_to_mint`](#0x123_packs_get_remaining_packs_to_mint)
-  [Function `get_pack_info`](#0x123_packs_get_pack_info)
-  [Function `get_pack_released`](#0x123_packs_get_pack_released)
-  [Function `get_pack_description`](#0x123_packs_get_pack_description)
-  [Function `get_pack_uri`](#0x123_packs_get_pack_uri)
-  [Function `get_pack_price`](#0x123_packs_get_pack_price)
-  [Function `get_pack_supply`](#0x123_packs_get_pack_supply)
-  [Function `get_pack_max_purchase`](#0x123_packs_get_pack_max_purchase)
-  [Function `get_pack_max_preorder`](#0x123_packs_get_pack_max_preorder)
-  [Function `get_pack_moments`](#0x123_packs_get_pack_moments)
-  [Function `get_pack_total`](#0x123_packs_get_pack_total)
-  [Function `get_pack_reserved`](#0x123_packs_get_pack_reserved)
-  [Function `is_preorder_enabled`](#0x123_packs_is_preorder_enabled)
-  [Function `get_pack_preorder_count`](#0x123_packs_get_pack_preorder_count)
-  [Function `get_pack_preorder_by_address`](#0x123_packs_get_pack_preorder_by_address)
-  [Function `get_slots_count`](#0x123_packs_get_slots_count)
-  [Function `get_slot_collections_names`](#0x123_packs_get_slot_collections_names)
-  [Function `get_slot_collection_quantity_by_name`](#0x123_packs_get_slot_collection_quantity_by_name)
-  [Function `get_slot_moments_count`](#0x123_packs_get_slot_moments_count)
-  [Function `get_total_moments_count`](#0x123_packs_get_total_moments_count)
-  [Function `get_collection_serial_numbers`](#0x123_packs_get_collection_serial_numbers)
-  [Function `get_collection_serial_numbers_count`](#0x123_packs_get_collection_serial_numbers_count)
-  [Function `is_pack_reserved`](#0x123_packs_is_pack_reserved)


<pre><code><b>use</b> <a href="pack_distribution.md#0x123_pack_distribution">0x123::pack_distribution</a>;
<b>use</b> <a href="">0x1::aptos_coin</a>;
<b>use</b> <a href="">0x1::bcs</a>;
<b>use</b> <a href="">0x1::big_ordered_map</a>;
<b>use</b> <a href="">0x1::coin</a>;
<b>use</b> <a href="">0x1::event</a>;
<b>use</b> <a href="">0x1::object</a>;
<b>use</b> <a href="">0x1::ordered_map</a>;
<b>use</b> <a href="">0x1::randomness</a>;
<b>use</b> <a href="">0x1::signer</a>;
<b>use</b> <a href="">0x1::smart_vector</a>;
<b>use</b> <a href="">0x1::string</a>;
<b>use</b> <a href="">0x1::table</a>;
<b>use</b> <a href="">0x1::table_with_length</a>;
<b>use</b> <a href="">0x1::vector</a>;
<b>use</b> <a href="">0x4::aptos_token</a>;
<b>use</b> <a href="">0x4::collection</a>;
<b>use</b> <a href="">0x4::property_map</a>;
</code></pre>



<a id="0x123_packs_PreOrder"></a>

## Struct `PreOrder`

Pre-order information for tracking user pre-orders


<pre><code><b>struct</b> <a href="packs.md#0x123_packs_PreOrder">PreOrder</a> <b>has</b> <b>copy</b>, drop, store
</code></pre>



<a id="0x123_packs_PackInfo"></a>

## Struct `PackInfo`

Pack information structure for view functions


<pre><code><b>struct</b> <a href="packs.md#0x123_packs_PackInfo">PackInfo</a> <b>has</b> <b>copy</b>, drop
</code></pre>



<a id="0x123_packs_Pack"></a>

## Resource `Pack`

Pack configuration and state


<pre><code><b>struct</b> <a href="packs.md#0x123_packs_Pack">Pack</a> <b>has</b> store, key
</code></pre>



<a id="0x123_packs_AdminTable"></a>

## Resource `AdminTable`

Global table that stores all admin addresses


<pre><code><b>struct</b> <a href="packs.md#0x123_packs_AdminTable">AdminTable</a> <b>has</b> key
</code></pre>



<a id="0x123_packs_PackStore"></a>

## Resource `PackStore`

Global storage for managing all packs


<pre><code><b>struct</b> <a href="packs.md#0x123_packs_PackStore">PackStore</a> <b>has</b> key
</code></pre>



<a id="0x123_packs_MomentDrawnEvent"></a>

## Struct `MomentDrawnEvent`

Event emitted when a moment is drawn from a pack


<pre><code>#[<a href="">event</a>]
<b>struct</b> <a href="packs.md#0x123_packs_MomentDrawnEvent">MomentDrawnEvent</a> <b>has</b> <b>copy</b>, drop, store
</code></pre>



<a id="0x123_packs_PacksRemovedFromSaleEvent"></a>

## Struct `PacksRemovedFromSaleEvent`

Event emitted when packs are removed from sale


<pre><code>#[<a href="">event</a>]
<b>struct</b> <a href="packs.md#0x123_packs_PacksRemovedFromSaleEvent">PacksRemovedFromSaleEvent</a> <b>has</b> <b>copy</b>, drop, store
</code></pre>



<a id="@Constants_0"></a>

## Constants


<a id="0x123_packs_E_COLLECTION_NOT_FOUND"></a>

Error when collection is not found


<pre><code><b>const</b> <a href="packs.md#0x123_packs_E_COLLECTION_NOT_FOUND">E_COLLECTION_NOT_FOUND</a>: u64 = 402;
</code></pre>



<a id="0x123_packs_E_LENGTH_MISMATCH"></a>

Error when vector lengths do not match


<pre><code><b>const</b> <a href="packs.md#0x123_packs_E_LENGTH_MISMATCH">E_LENGTH_MISMATCH</a>: u64 = 207;
</code></pre>



<a id="0x123_packs_E_NO_COLLECTIONS_AVAILABLE"></a>

Error when no collections are available in a slot


<pre><code><b>const</b> <a href="packs.md#0x123_packs_E_NO_COLLECTIONS_AVAILABLE">E_NO_COLLECTIONS_AVAILABLE</a>: u64 = 501;
</code></pre>



<a id="0x123_packs_E_NO_MOMENTS_AVAILABLE"></a>

Error when no moments are available for a collection


<pre><code><b>const</b> <a href="packs.md#0x123_packs_E_NO_MOMENTS_AVAILABLE">E_NO_MOMENTS_AVAILABLE</a>: u64 = 502;
</code></pre>



<a id="0x123_packs_E_SLOT_NOT_FOUND"></a>

Error when slot is not found


<pre><code><b>const</b> <a href="packs.md#0x123_packs_E_SLOT_NOT_FOUND">E_SLOT_NOT_FOUND</a>: u64 = 403;
</code></pre>



<a id="0x123_packs_BURNER_ADDRESS"></a>

Burner address where tokens are sent to be "burned"


<pre><code><b>const</b> <a href="packs.md#0x123_packs_BURNER_ADDRESS">BURNER_ADDRESS</a>: <b>address</b> = 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff;
</code></pre>



<a id="0x123_packs_E_ADMIN_ALREADY_EXISTS"></a>

Error when admin already exists


<pre><code><b>const</b> <a href="packs.md#0x123_packs_E_ADMIN_ALREADY_EXISTS">E_ADMIN_ALREADY_EXISTS</a>: u64 = 102;
</code></pre>



<a id="0x123_packs_E_ADMIN_CANNOT_REMOVE_OWNER"></a>

Error when attempting to remove the owner as admin


<pre><code><b>const</b> <a href="packs.md#0x123_packs_E_ADMIN_CANNOT_REMOVE_OWNER">E_ADMIN_CANNOT_REMOVE_OWNER</a>: u64 = 103;
</code></pre>



<a id="0x123_packs_E_ADMIN_NOT_FOUND"></a>

Error when admin is not found


<pre><code><b>const</b> <a href="packs.md#0x123_packs_E_ADMIN_NOT_FOUND">E_ADMIN_NOT_FOUND</a>: u64 = 404;
</code></pre>



<a id="0x123_packs_E_ALREADY_PREORDERED"></a>

Error when user has already placed a preorder


<pre><code><b>const</b> <a href="packs.md#0x123_packs_E_ALREADY_PREORDERED">E_ALREADY_PREORDERED</a>: u64 = 303;
</code></pre>



<a id="0x123_packs_E_INVALID_AMOUNT"></a>

Error when amount is invalid (zero or negative)


<pre><code><b>const</b> <a href="packs.md#0x123_packs_E_INVALID_AMOUNT">E_INVALID_AMOUNT</a>: u64 = 200;
</code></pre>



<a id="0x123_packs_E_INVALID_MOMENTS_COUNT"></a>

Error when moments count is invalid for the pack configuration


<pre><code><b>const</b> <a href="packs.md#0x123_packs_E_INVALID_MOMENTS_COUNT">E_INVALID_MOMENTS_COUNT</a>: u64 = 202;
</code></pre>



<a id="0x123_packs_E_INVALID_MOMENTS_DISTRIBUTION_QUANTITY"></a>

Error when moments distribution quantity is invalid


<pre><code><b>const</b> <a href="packs.md#0x123_packs_E_INVALID_MOMENTS_DISTRIBUTION_QUANTITY">E_INVALID_MOMENTS_DISTRIBUTION_QUANTITY</a>: u64 = 206;
</code></pre>



<a id="0x123_packs_E_INVALID_PACKS_FOR_SALE_COUNT"></a>

Error when packs for sale count is invalid


<pre><code><b>const</b> <a href="packs.md#0x123_packs_E_INVALID_PACKS_FOR_SALE_COUNT">E_INVALID_PACKS_FOR_SALE_COUNT</a>: u64 = 205;
</code></pre>



<a id="0x123_packs_E_INVALID_RESERVED_PACKS_COUNT"></a>

Error when reserved packs count is invalid


<pre><code><b>const</b> <a href="packs.md#0x123_packs_E_INVALID_RESERVED_PACKS_COUNT">E_INVALID_RESERVED_PACKS_COUNT</a>: u64 = 204;
</code></pre>



<a id="0x123_packs_E_INVALID_SLOTS_COUNT"></a>

Error when slots count is invalid for the pack configuration


<pre><code><b>const</b> <a href="packs.md#0x123_packs_E_INVALID_SLOTS_COUNT">E_INVALID_SLOTS_COUNT</a>: u64 = 201;
</code></pre>



<a id="0x123_packs_E_INVALID_SLOT_INDEX"></a>

Error when slot index is invalid


<pre><code><b>const</b> <a href="packs.md#0x123_packs_E_INVALID_SLOT_INDEX">E_INVALID_SLOT_INDEX</a>: u64 = 203;
</code></pre>



<a id="0x123_packs_E_NOT_ADMIN"></a>

Error when user is not an admin


<pre><code><b>const</b> <a href="packs.md#0x123_packs_E_NOT_ADMIN">E_NOT_ADMIN</a>: u64 = 101;
</code></pre>



<a id="0x123_packs_E_NOT_AUTHORIZED"></a>

Error when user is not authorized to perform the action


<pre><code><b>const</b> <a href="packs.md#0x123_packs_E_NOT_AUTHORIZED">E_NOT_AUTHORIZED</a>: u64 = 100;
</code></pre>



<a id="0x123_packs_E_NOT_RELEASED"></a>

Error when pack is not yet released for sale


<pre><code><b>const</b> <a href="packs.md#0x123_packs_E_NOT_RELEASED">E_NOT_RELEASED</a>: u64 = 304;
</code></pre>



<a id="0x123_packs_E_NO_PACKS_AVAILABLE"></a>

Error when no packs are available for the requested action


<pre><code><b>const</b> <a href="packs.md#0x123_packs_E_NO_PACKS_AVAILABLE">E_NO_PACKS_AVAILABLE</a>: u64 = 500;
</code></pre>



<a id="0x123_packs_E_PACK_ALREADY_EXISTS"></a>

Error when attempting to create a pack that already exists


<pre><code><b>const</b> <a href="packs.md#0x123_packs_E_PACK_ALREADY_EXISTS">E_PACK_ALREADY_EXISTS</a>: u64 = 301;
</code></pre>



<a id="0x123_packs_E_PACK_ALREADY_OPENED"></a>

Error when pack has already been opened


<pre><code><b>const</b> <a href="packs.md#0x123_packs_E_PACK_ALREADY_OPENED">E_PACK_ALREADY_OPENED</a>: u64 = 300;
</code></pre>



<a id="0x123_packs_E_PACK_ALREADY_RELEASED"></a>

Error when pack has already been released


<pre><code><b>const</b> <a href="packs.md#0x123_packs_E_PACK_ALREADY_RELEASED">E_PACK_ALREADY_RELEASED</a>: u64 = 302;
</code></pre>



<a id="0x123_packs_E_PACK_NOT_FOUND"></a>

Error when pack is not found


<pre><code><b>const</b> <a href="packs.md#0x123_packs_E_PACK_NOT_FOUND">E_PACK_NOT_FOUND</a>: u64 = 400;
</code></pre>



<a id="0x123_packs_E_PACK_TOKEN_NOT_FOUND"></a>

Error when pack token is not found


<pre><code><b>const</b> <a href="packs.md#0x123_packs_E_PACK_TOKEN_NOT_FOUND">E_PACK_TOKEN_NOT_FOUND</a>: u64 = 401;
</code></pre>



<a id="0x123_packs_E_PREORDER_EXCEEDS_LIMIT"></a>

Error when preorder amount exceeds the maximum allowed limit


<pre><code><b>const</b> <a href="packs.md#0x123_packs_E_PREORDER_EXCEEDS_LIMIT">E_PREORDER_EXCEEDS_LIMIT</a>: u64 = 503;
</code></pre>



<a id="0x123_packs_E_PREORDER_EXCEEDS_SUPPLY"></a>

Error when preorder amount exceeds available supply


<pre><code><b>const</b> <a href="packs.md#0x123_packs_E_PREORDER_EXCEEDS_SUPPLY">E_PREORDER_EXCEEDS_SUPPLY</a>: u64 = 505;
</code></pre>



<a id="0x123_packs_E_PREORDER_NOT_ENABLED"></a>

Error when preorders are not enabled


<pre><code><b>const</b> <a href="packs.md#0x123_packs_E_PREORDER_NOT_ENABLED">E_PREORDER_NOT_ENABLED</a>: u64 = 305;
</code></pre>



<a id="0x123_packs_E_PREORDER_SHOULD_BE_DISABLED"></a>

Error when preorders should be disabled before release


<pre><code><b>const</b> <a href="packs.md#0x123_packs_E_PREORDER_SHOULD_BE_DISABLED">E_PREORDER_SHOULD_BE_DISABLED</a>: u64 = 306;
</code></pre>



<a id="0x123_packs_E_PURCHASE_EXCEEDS_LIMIT"></a>

Error when purchase amount exceeds the maximum allowed limit


<pre><code><b>const</b> <a href="packs.md#0x123_packs_E_PURCHASE_EXCEEDS_LIMIT">E_PURCHASE_EXCEEDS_LIMIT</a>: u64 = 504;
</code></pre>



<a id="0x123_packs_E_RESERVE_EXCEEDS_SUPPLY"></a>

Error when reserved packs exceed total supply


<pre><code><b>const</b> <a href="packs.md#0x123_packs_E_RESERVE_EXCEEDS_SUPPLY">E_RESERVE_EXCEEDS_SUPPLY</a>: u64 = 506;
</code></pre>



<a id="0x123_packs_add_admin"></a>

## Function `add_admin`

Add a new admin to the system

Only existing admins can add new admins. The new admin address
must not already exist in the admin table.


<a id="@Arguments_1"></a>

### Arguments

* <code>admin</code> - The signer of an existing admin
* <code>new_admin_addr</code> - Address of the new admin to add


<pre><code><b>public</b> entry <b>fun</b> <a href="packs.md#0x123_packs_add_admin">add_admin</a>(admin: &<a href="">signer</a>, new_admin_addr: <b>address</b>)
</code></pre>



<a id="0x123_packs_remove_admin"></a>

## Function `remove_admin`

Remove an admin from the system

Only existing admins can remove admins. The owner cannot be removed
as an admin.


<a id="@Arguments_2"></a>

### Arguments

* <code>admin</code> - The signer of an existing admin
* <code>admin_to_remove</code> - Address of the admin to remove


<pre><code><b>public</b> entry <b>fun</b> <a href="packs.md#0x123_packs_remove_admin">remove_admin</a>(admin: &<a href="">signer</a>, admin_to_remove: <b>address</b>)
</code></pre>



<a id="0x123_packs_create_pack"></a>

## Function `create_pack`

Creates a new pack with its own distribution

This function creates a new pack with all necessary configuration
including distribution setup, pricing, and collection parameters.
Only admins can create packs.


<a id="@Arguments_3"></a>

### Arguments

* <code>creator</code> - The signer of an admin creating the pack
* <code>pack_name</code> - Unique name for the pack
* <code>description</code> - Description of the pack
* <code>uri</code> - URI for pack metadata
* <code>price</code> - Price in octas (smallest unit of APT)
* <code>supply</code> - Total supply of packs
* <code>max_purchase</code> - Maximum packs a user can purchase
* <code>max_preorder</code> - Maximum packs a user can pre-order
* <code>moments_per_pack</code> - Number of moments per pack
* <code>reserved_packs</code> - Number of packs reserved for creator
* <code>mutable_description</code> - Whether collection description is mutable
* <code>mutable_royalty</code> - Whether collection royalty is mutable
* <code>mutable_uri</code> - Whether collection URI is mutable
* <code>mutable_token_description</code> - Whether token description is mutable
* <code>mutable_token_name</code> - Whether token name is mutable
* <code>mutable_token_properties</code> - Whether token properties are mutable
* <code>mutable_token_uri</code> - Whether token URI is mutable
* <code>tokens_burnable_by_creator</code> - Whether tokens can be burned by creator
* <code>tokens_freezable_by_creator</code> - Whether tokens can be frozen by creator
* <code>royalty_numerator</code> - Royalty numerator for the collection
* <code>royalty_denominator</code> - Royalty denominator for the collection


<pre><code><b>public</b> entry <b>fun</b> <a href="packs.md#0x123_packs_create_pack">create_pack</a>(creator: &<a href="">signer</a>, pack_name: <a href="_String">string::String</a>, description: <a href="_String">string::String</a>, uri: <a href="_String">string::String</a>, price: u64, supply: u64, max_purchase: u64, max_preorder: u64, moments_per_pack: u64, reserved_packs: u64, mutable_description: bool, mutable_royalty: bool, mutable_uri: bool, mutable_token_description: bool, mutable_token_name: bool, mutable_token_properties: bool, mutable_token_uri: bool, tokens_burnable_by_creator: bool, tokens_freezable_by_creator: bool, royalty_numerator: u64, royalty_denominator: u64)
</code></pre>



<a id="0x123_packs_add_collections_to_distribution"></a>

## Function `add_collections_to_distribution`

Add collections to a pack's distribution (global or reserved)

This function allows admins to add collections to specific slots
in either the global distribution (for packs for sale) or the
reserved distribution (for reserved packs).


<a id="@Arguments_4"></a>

### Arguments

* <code>creator</code> - The signer of an admin
* <code>pack_name</code> - Name of the pack to modify
* <code>slot</code> - Slot index to add collections to
* <code>collection_names</code> - Vector of collection names to add
* <code>quantities</code> - Vector of quantities for each collection
* <code>global_distribution</code> - Whether to use global or reserved distribution


<pre><code><b>public</b> entry <b>fun</b> <a href="packs.md#0x123_packs_add_collections_to_distribution">add_collections_to_distribution</a>(creator: &<a href="">signer</a>, pack_name: <a href="_String">string::String</a>, slot: u64, collection_names: <a href="">vector</a>&lt;<a href="_String">string::String</a>&gt;, quantities: <a href="">vector</a>&lt;u64&gt;, global_distribution: bool)
</code></pre>



<a id="0x123_packs_add_serial_numbers"></a>

## Function `add_serial_numbers`



<pre><code><b>public</b> entry <b>fun</b> <a href="packs.md#0x123_packs_add_serial_numbers">add_serial_numbers</a>(admin: &<a href="">signer</a>, pack_name: <a href="_String">string::String</a>, collection_name: <a href="_String">string::String</a>, serial_numbers: <a href="">vector</a>&lt;u32&gt;)
</code></pre>



<a id="0x123_packs_add_serial_numbers_with_range"></a>

## Function `add_serial_numbers_with_range`



<pre><code><b>public</b> entry <b>fun</b> <a href="packs.md#0x123_packs_add_serial_numbers_with_range">add_serial_numbers_with_range</a>(creator: &<a href="">signer</a>, pack_name: <a href="_String">string::String</a>, collection_name: <a href="_String">string::String</a>, start_serial: u32, end_serial: u32)
</code></pre>



<a id="0x123_packs_mint_packs_batch"></a>

## Function `mint_packs_batch`



<pre><code><b>public</b> entry <b>fun</b> <a href="packs.md#0x123_packs_mint_packs_batch">mint_packs_batch</a>(creator: &<a href="">signer</a>, pack_name: <a href="_String">string::String</a>, batch_size: u64, global_distribution: bool)
</code></pre>



<a id="0x123_packs_set_max_purchase"></a>

## Function `set_max_purchase`



<pre><code><b>public</b> entry <b>fun</b> <a href="packs.md#0x123_packs_set_max_purchase">set_max_purchase</a>(creator: &<a href="">signer</a>, pack_name: <a href="_String">string::String</a>, new_max: u64)
</code></pre>



<a id="0x123_packs_set_max_preorder"></a>

## Function `set_max_preorder`



<pre><code><b>public</b> entry <b>fun</b> <a href="packs.md#0x123_packs_set_max_preorder">set_max_preorder</a>(creator: &<a href="">signer</a>, pack_name: <a href="_String">string::String</a>, new_max: u64)
</code></pre>



<a id="0x123_packs_set_pack_price"></a>

## Function `set_pack_price`



<pre><code><b>public</b> entry <b>fun</b> <a href="packs.md#0x123_packs_set_pack_price">set_pack_price</a>(creator: &<a href="">signer</a>, pack_name: <a href="_String">string::String</a>, new_price: u64)
</code></pre>



<a id="0x123_packs_set_reserved_packs"></a>

## Function `set_reserved_packs`



<pre><code><b>public</b> entry <b>fun</b> <a href="packs.md#0x123_packs_set_reserved_packs">set_reserved_packs</a>(creator: &<a href="">signer</a>, pack_name: <a href="_String">string::String</a>, new_reserved: u64)
</code></pre>



<a id="0x123_packs_pre_order"></a>

## Function `pre_order`

Allows users to pre-order packs before they are minted

Users can pre-order packs when preorders are enabled. Payment
is transferred immediately to the creator.


<a id="@Arguments_5"></a>

### Arguments

* <code>user</code> - The signer of the user placing the pre-order
* <code>creator</code> - The signer of the creator (for payment)
* <code>pack_name</code> - Name of the pack to pre-order
* <code>amount</code> - Number of packs to pre-order


<pre><code><b>public</b> entry <b>fun</b> <a href="packs.md#0x123_packs_pre_order">pre_order</a>(user: &<a href="">signer</a>, creator: &<a href="">signer</a>, pack_name: <a href="_String">string::String</a>, amount: u64)
</code></pre>



<a id="0x123_packs_assign_pre_order"></a>

## Function `assign_pre_order`



<pre><code><b>public</b> entry <b>fun</b> <a href="packs.md#0x123_packs_assign_pre_order">assign_pre_order</a>(creator: &<a href="">signer</a>, pack_name: <a href="_String">string::String</a>, user_addr: <b>address</b>, amount: u64)
</code></pre>



<a id="0x123_packs_set_preorder_enabled"></a>

## Function `set_preorder_enabled`



<pre><code><b>public</b> entry <b>fun</b> <a href="packs.md#0x123_packs_set_preorder_enabled">set_preorder_enabled</a>(admin: &<a href="">signer</a>, pack_name: <a href="_String">string::String</a>, enabled: bool)
</code></pre>



<a id="0x123_packs_preorder_release_batch"></a>

## Function `preorder_release_batch`



<pre><code><b>public</b> entry <b>fun</b> <a href="packs.md#0x123_packs_preorder_release_batch">preorder_release_batch</a>(admin: &<a href="">signer</a>, pack_name: <a href="_String">string::String</a>, batch_size: u64)
</code></pre>



<a id="0x123_packs_release_pack"></a>

## Function `release_pack`



<pre><code><b>public</b> entry <b>fun</b> <a href="packs.md#0x123_packs_release_pack">release_pack</a>(creator: &<a href="">signer</a>, pack_name: <a href="_String">string::String</a>)
</code></pre>



<a id="0x123_packs_remove_pack_from_sale_by_address"></a>

## Function `remove_pack_from_sale_by_address`



<pre><code><b>public</b> entry <b>fun</b> <a href="packs.md#0x123_packs_remove_pack_from_sale_by_address">remove_pack_from_sale_by_address</a>(admin: &<a href="">signer</a>, pack_name: <a href="_String">string::String</a>, token_address: <b>address</b>)
</code></pre>



<a id="0x123_packs_remove_packs_from_sale_by_quantity"></a>

## Function `remove_packs_from_sale_by_quantity`



<pre><code><b>public</b> entry <b>fun</b> <a href="packs.md#0x123_packs_remove_packs_from_sale_by_quantity">remove_packs_from_sale_by_quantity</a>(admin: &<a href="">signer</a>, pack_name: <a href="_String">string::String</a>, amount: u64)
</code></pre>



<a id="0x123_packs_remove_serial_numbers_global"></a>

## Function `remove_serial_numbers_global`



<pre><code><b>public</b> entry <b>fun</b> <a href="packs.md#0x123_packs_remove_serial_numbers_global">remove_serial_numbers_global</a>(admin: &<a href="">signer</a>, pack_name: <a href="_String">string::String</a>, collection_names: <a href="">vector</a>&lt;<a href="_String">string::String</a>&gt;, serial_numbers: <a href="">vector</a>&lt;u32&gt;)
</code></pre>



<a id="0x123_packs_remove_serial_numbers_reserved"></a>

## Function `remove_serial_numbers_reserved`



<pre><code><b>public</b> entry <b>fun</b> <a href="packs.md#0x123_packs_remove_serial_numbers_reserved">remove_serial_numbers_reserved</a>(admin: &<a href="">signer</a>, pack_name: <a href="_String">string::String</a>, collection_names: <a href="">vector</a>&lt;<a href="_String">string::String</a>&gt;, serial_numbers: <a href="">vector</a>&lt;u32&gt;, token_address: <b>address</b>)
</code></pre>



<a id="0x123_packs_purchase"></a>

## Function `purchase`

Purchase packs when sale is open

Users can purchase packs when the pack has been released and
sales are open. Payment is transferred to the creator.


<a id="@Arguments_6"></a>

### Arguments

* <code>user</code> - The signer of the user purchasing packs
* <code>creator</code> - The signer of the creator (for payment)
* <code>pack_name</code> - Name of the pack to purchase
* <code>amount</code> - Number of packs to purchase


<pre><code><b>public</b> entry <b>fun</b> <a href="packs.md#0x123_packs_purchase">purchase</a>(user: &<a href="">signer</a>, creator: &<a href="">signer</a>, pack_name: <a href="_String">string::String</a>, amount: u64)
</code></pre>



<a id="0x123_packs_assign_purchase"></a>

## Function `assign_purchase`



<pre><code><b>public</b> entry <b>fun</b> <a href="packs.md#0x123_packs_assign_purchase">assign_purchase</a>(creator: &<a href="">signer</a>, pack_name: <a href="_String">string::String</a>, user_addr: <b>address</b>, amount: u64)
</code></pre>



<a id="0x123_packs_open"></a>

## Function `open`

Open a pack to reveal its contents

This function opens a pack and reveals the moments inside based on
the pack's distribution. Uses randomness to select moments.


<a id="@Arguments_7"></a>

### Arguments

* <code>user</code> - The signer of the user opening the pack
* <code>creator</code> - The signer of the creator (for minting moments)
* <code>pack_name</code> - Name of the pack to open
* <code>pack_token_id</code> - Address of the pack token to open


<pre><code>#[<a href="">randomness</a>]
entry <b>fun</b> <a href="packs.md#0x123_packs_open">open</a>(user: &<a href="">signer</a>, creator: &<a href="">signer</a>, pack_name: <a href="_String">string::String</a>, pack_token_id: <b>address</b>)
</code></pre>



<a id="0x123_packs_is_address_admin"></a>

## Function `is_address_admin`

Check if an address is admin


<a id="@Arguments_8"></a>

### Arguments

* <code>admin_addr</code> - Address to check


<a id="@Returns_9"></a>

### Returns

* <code>bool</code> - True if the address is an admin


<pre><code>#[view]
<b>public</b> <b>fun</b> <a href="packs.md#0x123_packs_is_address_admin">is_address_admin</a>(admin_addr: <b>address</b>): bool
</code></pre>



<a id="0x123_packs_is_address_owner"></a>

## Function `is_address_owner`

Check if an address is owner


<a id="@Arguments_10"></a>

### Arguments

* <code>owner_addr</code> - Address to check


<a id="@Returns_11"></a>

### Returns

* <code>bool</code> - True if the address is the owner


<pre><code>#[view]
<b>public</b> <b>fun</b> <a href="packs.md#0x123_packs_is_address_owner">is_address_owner</a>(owner_addr: <b>address</b>): bool
</code></pre>



<a id="0x123_packs_get_owner"></a>

## Function `get_owner`

Get the owner address of the contract


<a id="@Returns_12"></a>

### Returns

* <code><b>address</b></code> - The owner address of the contract


<pre><code>#[view]
<b>public</b> <b>fun</b> <a href="packs.md#0x123_packs_get_owner">get_owner</a>(): <b>address</b>
</code></pre>



<a id="0x123_packs_get_packs_for_sale_available"></a>

## Function `get_packs_for_sale_available`



<pre><code>#[view]
<b>public</b> <b>fun</b> <a href="packs.md#0x123_packs_get_packs_for_sale_available">get_packs_for_sale_available</a>(_creator_addr: <b>address</b>, pack_name: <a href="_String">string::String</a>): u64
</code></pre>



<a id="0x123_packs_get_remaining_packs_to_mint"></a>

## Function `get_remaining_packs_to_mint`



<pre><code>#[view]
<b>public</b> <b>fun</b> <a href="packs.md#0x123_packs_get_remaining_packs_to_mint">get_remaining_packs_to_mint</a>(_creator_addr: <b>address</b>, pack_name: <a href="_String">string::String</a>): u64
</code></pre>



<a id="0x123_packs_get_pack_info"></a>

## Function `get_pack_info`



<pre><code>#[view]
<b>public</b> <b>fun</b> <a href="packs.md#0x123_packs_get_pack_info">get_pack_info</a>(_creator_addr: <b>address</b>, pack_name: <a href="_String">string::String</a>): <a href="packs.md#0x123_packs_PackInfo">packs::PackInfo</a>
</code></pre>



<a id="0x123_packs_get_pack_released"></a>

## Function `get_pack_released`



<pre><code>#[view]
<b>public</b> <b>fun</b> <a href="packs.md#0x123_packs_get_pack_released">get_pack_released</a>(_creator_addr: <b>address</b>, pack_name: <a href="_String">string::String</a>): bool
</code></pre>



<a id="0x123_packs_get_pack_description"></a>

## Function `get_pack_description`



<pre><code>#[view]
<b>public</b> <b>fun</b> <a href="packs.md#0x123_packs_get_pack_description">get_pack_description</a>(_creator_addr: <b>address</b>, pack_name: <a href="_String">string::String</a>): <a href="_String">string::String</a>
</code></pre>



<a id="0x123_packs_get_pack_uri"></a>

## Function `get_pack_uri`



<pre><code>#[view]
<b>public</b> <b>fun</b> <a href="packs.md#0x123_packs_get_pack_uri">get_pack_uri</a>(_creator_addr: <b>address</b>, pack_name: <a href="_String">string::String</a>): <a href="_String">string::String</a>
</code></pre>



<a id="0x123_packs_get_pack_price"></a>

## Function `get_pack_price`



<pre><code>#[view]
<b>public</b> <b>fun</b> <a href="packs.md#0x123_packs_get_pack_price">get_pack_price</a>(_creator_addr: <b>address</b>, pack_name: <a href="_String">string::String</a>): u64
</code></pre>



<a id="0x123_packs_get_pack_supply"></a>

## Function `get_pack_supply`



<pre><code>#[view]
<b>public</b> <b>fun</b> <a href="packs.md#0x123_packs_get_pack_supply">get_pack_supply</a>(_creator_addr: <b>address</b>, pack_name: <a href="_String">string::String</a>): u64
</code></pre>



<a id="0x123_packs_get_pack_max_purchase"></a>

## Function `get_pack_max_purchase`



<pre><code>#[view]
<b>public</b> <b>fun</b> <a href="packs.md#0x123_packs_get_pack_max_purchase">get_pack_max_purchase</a>(_creator_addr: <b>address</b>, pack_name: <a href="_String">string::String</a>): u64
</code></pre>



<a id="0x123_packs_get_pack_max_preorder"></a>

## Function `get_pack_max_preorder`



<pre><code>#[view]
<b>public</b> <b>fun</b> <a href="packs.md#0x123_packs_get_pack_max_preorder">get_pack_max_preorder</a>(_creator_addr: <b>address</b>, pack_name: <a href="_String">string::String</a>): u64
</code></pre>



<a id="0x123_packs_get_pack_moments"></a>

## Function `get_pack_moments`



<pre><code>#[view]
<b>public</b> <b>fun</b> <a href="packs.md#0x123_packs_get_pack_moments">get_pack_moments</a>(_creator_addr: <b>address</b>, pack_name: <a href="_String">string::String</a>): u64
</code></pre>



<a id="0x123_packs_get_pack_total"></a>

## Function `get_pack_total`



<pre><code>#[view]
<b>public</b> <b>fun</b> <a href="packs.md#0x123_packs_get_pack_total">get_pack_total</a>(_creator_addr: <b>address</b>, pack_name: <a href="_String">string::String</a>): u64
</code></pre>



<a id="0x123_packs_get_pack_reserved"></a>

## Function `get_pack_reserved`



<pre><code>#[view]
<b>public</b> <b>fun</b> <a href="packs.md#0x123_packs_get_pack_reserved">get_pack_reserved</a>(_creator_addr: <b>address</b>, pack_name: <a href="_String">string::String</a>): u64
</code></pre>



<a id="0x123_packs_is_preorder_enabled"></a>

## Function `is_preorder_enabled`



<pre><code>#[view]
<b>public</b> <b>fun</b> <a href="packs.md#0x123_packs_is_preorder_enabled">is_preorder_enabled</a>(_creator_addr: <b>address</b>, pack_name: <a href="_String">string::String</a>): bool
</code></pre>



<a id="0x123_packs_get_pack_preorder_count"></a>

## Function `get_pack_preorder_count`



<pre><code>#[view]
<b>public</b> <b>fun</b> <a href="packs.md#0x123_packs_get_pack_preorder_count">get_pack_preorder_count</a>(_creator_addr: <b>address</b>, pack_name: <a href="_String">string::String</a>): u64
</code></pre>



<a id="0x123_packs_get_pack_preorder_by_address"></a>

## Function `get_pack_preorder_by_address`



<pre><code>#[view]
<b>public</b> <b>fun</b> <a href="packs.md#0x123_packs_get_pack_preorder_by_address">get_pack_preorder_by_address</a>(_creator_addr: <b>address</b>, pack_name: <a href="_String">string::String</a>, user_addr: <b>address</b>): u64
</code></pre>



<a id="0x123_packs_get_slots_count"></a>

## Function `get_slots_count`



<pre><code>#[view]
<b>public</b> <b>fun</b> <a href="packs.md#0x123_packs_get_slots_count">get_slots_count</a>(_creator_addr: <b>address</b>, pack_name: <a href="_String">string::String</a>): u64
</code></pre>



<a id="0x123_packs_get_slot_collections_names"></a>

## Function `get_slot_collections_names`



<pre><code>#[view]
<b>public</b> <b>fun</b> <a href="packs.md#0x123_packs_get_slot_collections_names">get_slot_collections_names</a>(_creator_addr: <b>address</b>, pack_name: <a href="_String">string::String</a>, slot: u64, use_reserved_distribution: bool): <a href="">vector</a>&lt;<a href="_String">string::String</a>&gt;
</code></pre>



<a id="0x123_packs_get_slot_collection_quantity_by_name"></a>

## Function `get_slot_collection_quantity_by_name`



<pre><code>#[view]
<b>public</b> <b>fun</b> <a href="packs.md#0x123_packs_get_slot_collection_quantity_by_name">get_slot_collection_quantity_by_name</a>(_creator_addr: <b>address</b>, pack_name: <a href="_String">string::String</a>, slot: u64, collection_name: <a href="_String">string::String</a>, use_reserved_distribution: bool): u64
</code></pre>



<a id="0x123_packs_get_slot_moments_count"></a>

## Function `get_slot_moments_count`



<pre><code>#[view]
<b>public</b> <b>fun</b> <a href="packs.md#0x123_packs_get_slot_moments_count">get_slot_moments_count</a>(_creator_addr: <b>address</b>, pack_name: <a href="_String">string::String</a>, slot: u64, use_reserved_distribution: bool): u64
</code></pre>



<a id="0x123_packs_get_total_moments_count"></a>

## Function `get_total_moments_count`



<pre><code>#[view]
<b>public</b> <b>fun</b> <a href="packs.md#0x123_packs_get_total_moments_count">get_total_moments_count</a>(_creator_addr: <b>address</b>, pack_name: <a href="_String">string::String</a>, use_reserved_distribution: bool): u64
</code></pre>



<a id="0x123_packs_get_collection_serial_numbers"></a>

## Function `get_collection_serial_numbers`



<pre><code>#[view]
<b>public</b> <b>fun</b> <a href="packs.md#0x123_packs_get_collection_serial_numbers">get_collection_serial_numbers</a>(_creator_addr: <b>address</b>, pack_name: <a href="_String">string::String</a>, collection_name: <a href="_String">string::String</a>): <a href="">vector</a>&lt;u32&gt;
</code></pre>



<a id="0x123_packs_get_collection_serial_numbers_count"></a>

## Function `get_collection_serial_numbers_count`



<pre><code>#[view]
<b>public</b> <b>fun</b> <a href="packs.md#0x123_packs_get_collection_serial_numbers_count">get_collection_serial_numbers_count</a>(_creator_addr: <b>address</b>, pack_name: <a href="_String">string::String</a>, collection_name: <a href="_String">string::String</a>): u64
</code></pre>



<a id="0x123_packs_is_pack_reserved"></a>

## Function `is_pack_reserved`



<pre><code>#[view]
<b>public</b> <b>fun</b> <a href="packs.md#0x123_packs_is_pack_reserved">is_pack_reserved</a>(_creator_addr: <b>address</b>, pack_name: <a href="_String">string::String</a>, pack_address: <b>address</b>): bool
</code></pre>
