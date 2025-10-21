<a id="ufc_strike_packs"></a>

# Module `ufc_strike::packs`

This module provides a comprehensive pack system for UFC Strike, allowing creators to create, manage, and distribute NFT packs with customizable distribution mechanics.

The key features are:
* Pack creation and configuration with customizable parameters
* Pre-order system for early access to packs
* Pack opening mechanics with random moment distribution
* Inventory management for available packs
* Distribution system for moments within packs
* Creator-controlled pack release and sales
* Admin management system
* Batch operations for efficiency

-  [Resource `Pack`](#ufc_strike_packs_Pack)
-  [Resource `PackStore`](#ufc_strike_packs_PackStore)
-  [Resource `AdminTable`](#ufc_strike_packs_AdminTable)
-  [Resource `PreOrder`](#ufc_strike_packs_PreOrder)
-  [Resource `PackInfo`](#ufc_strike_packs_PackInfo)
-  [Events](#@Events_0)
-  [Constants](#@Constants_0)
-  [Function `init_module`](#ufc_strike_packs_init_module)
-  [Function `add_admin`](#ufc_strike_packs_add_admin)
-  [Function `remove_admin`](#ufc_strike_packs_remove_admin)
-  [Function `create_pack`](#ufc_strike_packs_create_pack)
-  [Function `add_collections_to_distribution`](#ufc_strike_packs_add_collections_to_distribution)
-  [Function `add_serial_numbers`](#ufc_strike_packs_add_serial_numbers)
-  [Function `add_serial_numbers_with_range`](#ufc_strike_packs_add_serial_numbers_with_range)
-  [Function `mint_packs_batch`](#ufc_strike_packs_mint_packs_batch)
-  [Function `set_max_purchase`](#ufc_strike_packs_set_max_purchase)
-  [Function `set_max_preorder`](#ufc_strike_packs_set_max_preorder)
-  [Function `set_pack_price`](#ufc_strike_packs_set_pack_price)
-  [Function `set_reserved_packs`](#ufc_strike_packs_set_reserved_packs)
-  [Function `pre_order`](#ufc_strike_packs_pre_order)
-  [Function `assign_pre_order`](#ufc_strike_packs_assign_pre_order)
-  [Function `set_preorder_enabled`](#ufc_strike_packs_set_preorder_enabled)
-  [Function `preorder_release_batch`](#ufc_strike_packs_preorder_release_batch)
-  [Function `release_pack`](#ufc_strike_packs_release_pack)
-  [Function `remove_pack_from_sale_by_address`](#ufc_strike_packs_remove_pack_from_sale_by_address)
-  [Function `remove_packs_from_sale_by_quantity`](#ufc_strike_packs_remove_packs_from_sale_by_quantity)
-  [Function `remove_serial_numbers_global`](#ufc_strike_packs_remove_serial_numbers_global)
-  [Function `remove_serial_numbers_reserved`](#ufc_strike_packs_remove_serial_numbers_reserved)
-  [Function `purchase`](#ufc_strike_packs_purchase)
-  [Function `assign_purchase`](#ufc_strike_packs_assign_purchase)
-  [Function `open`](#ufc_strike_packs_open)
-  [Function `is_address_admin`](#ufc_strike_packs_is_address_admin)
-  [Function `is_address_owner`](#ufc_strike_packs_is_address_owner)
-  [Function `get_owner`](#ufc_strike_packs_get_owner)
-  [Function `get_packs_for_sale_available`](#ufc_strike_packs_get_packs_for_sale_available)
-  [Function `get_remaining_packs_to_mint`](#ufc_strike_packs_get_remaining_packs_to_mint)
-  [Function `get_pack_info`](#ufc_strike_packs_get_pack_info)
-  [Function `get_pack_description`](#ufc_strike_packs_get_pack_description)
-  [Function `get_pack_uri`](#ufc_strike_packs_get_pack_uri)
-  [Function `get_pack_price`](#ufc_strike_packs_get_pack_price)
-  [Function `get_pack_supply`](#ufc_strike_packs_get_pack_supply)
-  [Function `get_pack_max_purchase`](#ufc_strike_packs_get_pack_max_purchase)
-  [Function `get_pack_max_preorder`](#ufc_strike_packs_get_pack_max_preorder)
-  [Function `get_pack_moments_per_pack`](#ufc_strike_packs_get_pack_moments_per_pack)
-  [Function `get_pack_released`](#ufc_strike_packs_get_pack_released)
-  [Function `get_pack_total_preorders`](#ufc_strike_packs_get_pack_total_preorders)
-  [Function `get_pack_reserved_packs`](#ufc_strike_packs_get_pack_reserved_packs)
-  [Function `get_pack_preorder_enabled`](#ufc_strike_packs_get_pack_preorder_enabled)
-  [Function `get_preorder_count`](#ufc_strike_packs_get_preorder_count)
-  [Function `get_total_preorder_amount`](#ufc_strike_packs_get_total_preorder_amount)
-  [Function `get_preorder_by_address`](#ufc_strike_packs_get_preorder_by_address)
-  [Function `is_preorder_enabled`](#ufc_strike_packs_is_preorder_enabled)
-  [Function `get_total_preorders_count`](#ufc_strike_packs_get_total_preorders_count)
-  [Function `get_slots_count`](#ufc_strike_packs_get_slots_count)
-  [Function `get_slot_collections_names`](#ufc_strike_packs_get_slot_collections_names)
-  [Function `get_slot_collection_quantity_by_name`](#ufc_strike_packs_get_slot_collection_quantity_by_name)
-  [Function `get_slot_moments_count`](#ufc_strike_packs_get_slot_moments_count)
-  [Function `get_total_moments_count`](#ufc_strike_packs_get_total_moments_count)
-  [Function `get_collection_serial_numbers`](#ufc_strike_packs_get_collection_serial_numbers)
-  [Function `get_collection_serial_numbers_count`](#ufc_strike_packs_get_collection_serial_numbers_count)
-  [Function `get_event_collection_name`](#ufc_strike_packs_get_event_collection_name)
-  [Function `get_event_serial_number`](#ufc_strike_packs_get_event_serial_number)

<pre><code><b>use</b> <a href="../../aptos-framework/../aptos-stdlib/../move-stdlib/doc/signer.md#0x1_signer">0x1::signer</a>;
<b>use</b> <a href="../../aptos-framework/../aptos-stdlib/../move-stdlib/doc/string.md#0x1_string">0x1::string</a>;
<b>use</b> <a href="../../aptos-framework/../aptos-stdlib/../move-stdlib/doc/vector.md#0x1_vector">0x1::vector</a>;
<b>use</b> <a href="../../aptos-framework/../aptos-stdlib/../move-stdlib/doc/bcs.md#0x1_bcs">0x1::bcs</a>;
<b>use</b> <a href="../../aptos-framework/../aptos-stdlib/../move-stdlib/doc/table.md#0x1_table">0x1::table</a>;
<b>use</b> <a href="../../aptos-framework/../aptos-stdlib/../move-stdlib/doc/big_ordered_map.md#0x1_big_ordered_map">0x1::big_ordered_map</a>;
<b>use</b> <a href="../../aptos-framework/doc/coin.md#0x1_coin">0x1::coin</a>;
<b>use</b> <a href="../../aptos-framework/doc/object.md#0x1_object">0x1::object</a>;
<b>use</b> <a href="../../aptos-framework/doc/randomness.md#0x1_randomness">0x1::randomness</a>;
<b>use</b> <a href="../../aptos-token-objects/doc/aptos_token.md#0x4_aptos_token">0x4::aptos_token</a>;
<b>use</b> <a href="../../aptos-token-objects/doc/collection.md#0x4_collection">0x4::collection</a>;
<b>use</b> <a href="../../aptos-token-objects/doc/property_map.md#0x4_property_map">0x4::property_map</a>;
<b>use</b> <a href="pack_distribution.md#ufc_strike_pack_distribution">ufc_strike::pack_distribution</a>;
</code></pre>



<a id="ufc_strike_packs_Pack"></a>

## Resource `Pack`

Storage state for managing individual pack configurations and state.

<pre><code><b>struct</b> <a href="packs.md#ufc_strike_packs_Pack">Pack</a> <b>has</b> key, store
</code></pre>

<details>
<summary>Fields</summary>

<dl>
<dt>
<code>description: <a href="../../aptos-framework/../aptos-stdlib/../move-stdlib/doc/string.md#0x1_string_String">string::String</a></code>
</dt>
<dd>
 Description of the pack
</dd>
<dt>
<code>uri: <a href="../../aptos-framework/../aptos-stdlib/../move-stdlib/doc/string.md#0x1_string_String">string::String</a></code>
</dt>
<dd>
 URI for pack metadata
</dd>
<dt>
<code>reserved_distribution: <a href="pack_distribution.md#ufc_strike_pack_distribution_PackDistribution">pack_distribution::PackDistribution</a></code>
</dt>
<dd>
 Reserved distribution for reserved packs
</dd>
<dt>
<code>distribution: <a href="pack_distribution.md#ufc_strike_pack_distribution_PackDistribution">pack_distribution::PackDistribution</a></code>
</dt>
<dd>
 Optimized distribution object for moments
</dd>
<dt>
<code>price: u64</code>
</dt>
<dd>
 Price in octas (smallest unit of APT)
</dd>
<dt>
<code>supply: u64</code>
</dt>
<dd>
 Total supply of packs
</dd>
<dt>
<code>max_purchase: u64</code>
</dt>
<dd>
 Maximum packs a user can purchase in one transaction
</dd>
<dt>
<code>max_preorder: u64</code>
</dt>
<dd>
 Maximum packs a user can pre-order
</dd>
<dt>
<code>moments_per_pack: u64</code>
</dt>
<dd>
 Number of moments each pack contains
</dd>
<dt>
<code>pre_orders: <a href="../../aptos-framework/../aptos-stdlib/../move-stdlib/doc/big_ordered_map.md#0x1_big_ordered_map_BigOrderedMap">big_ordered_map::BigOrderedMap</a>&lt;<b>address</b>, u64&gt;</code>
</dt>
<dd>
 Map of user addresses to their pre-order amounts
</dd>
<dt>
<code>total_preorders: u64</code>
</dt>
<dd>
 Total amount of pre-orders across all users
</dd>
<dt>
<code>reserved_packs: u64</code>
</dt>
<dd>
 Packs reserved for creator (not available for sale)
</dd>
<dt>
<code>released: bool</code>
</dt>
<dd>
 Whether the pack has been released (also indicates if sales are open)
</dd>
<dt>
<code>preorder_enabled: bool</code>
</dt>
<dd>
 Whether preorders are currently enabled
</dd>
<dt>
<code>packs_for_sale: <a href="../../aptos-framework/../aptos-stdlib/../move-stdlib/doc/smart_vector.md#0x1_smart_vector_SmartVector">smart_vector::SmartVector</a>&lt;<b>address</b>&gt;</code>
</dt>
<dd>
 Pack token addresses already minted and available for transfer
</dd>
<dt>
<code>packs_reserved: <a href="../../aptos-framework/../aptos-stdlib/../move-stdlib/doc/table_with_length.md#0x1_table_with_length_TableWithLength">table_with_length::TableWithLength</a>&lt;<b>address</b>, bool&gt;</code>
</dt>
<dd>
 Pack token addresses reserved for creator (not available for sale) - persistent storage
</dd>
<dt>
<code>collections_serials_numbers: <a href="../../aptos-framework/../aptos-stdlib/../move-stdlib/doc/ordered_map.md#0x1_ordered_map_OrderedMap">ordered_map::OrderedMap</a>&lt;<a href="../../aptos-framework/../aptos-stdlib/../move-stdlib/doc/string.md#0x1_string_String">string::String</a>, <a href="../../aptos-framework/../aptos-stdlib/../move-stdlib/doc/vector.md#0x1_vector">vector</a>&lt;u32&gt;&gt;</code>
</dt>
<dd>
 Map of collection names to their serial numbers
</dd>
</dl>

</details>

<a id="ufc_strike_packs_PackStore"></a>

## Resource `PackStore`

Global storage for managing all packs created by a creator.

<pre><code><b>struct</b> <a href="packs.md#ufc_strike_packs_PackStore">PackStore</a> <b>has</b> key
</code></pre>

<details>
<summary>Fields</summary>

<dl>
<dt>
<code>packs: <a href="../../aptos-framework/../aptos-stdlib/../move-stdlib/doc/table.md#0x1_table_Table">table::Table</a>&lt;<a href="../../aptos-framework/../aptos-stdlib/../move-stdlib/doc/string.md#0x1_string_String">string::String</a>, <a href="packs.md#ufc_strike_packs_Pack">Pack</a>&gt;</code>
</dt>
<dd>
 Table mapping pack names to Pack resources
</dd>
</dl>

</details>

<a id="ufc_strike_packs_AdminTable"></a>

## Resource `AdminTable`

Global table that stores all admin addresses.

<pre><code><b>struct</b> <a href="packs.md#ufc_strike_packs_AdminTable">AdminTable</a> <b>has</b> key
</code></pre>

<details>
<summary>Fields</summary>

<dl>
<dt>
<code>admins: <a href="../../aptos-framework/../aptos-stdlib/../move-stdlib/doc/table.md#0x1_table_Table">table::Table</a>&lt;<b>address</b>, bool&gt;</code>
</dt>
<dd>
 Table mapping admin addresses to their active status
</dd>
</dl>

</details>

<a id="ufc_strike_packs_PreOrder"></a>

## Resource `PreOrder`

Pre-order information for tracking user pre-orders.

<pre><code><b>struct</b> <a href="packs.md#ufc_strike_packs_PreOrder">PreOrder</a> <b>has</b> copy, drop, store
</code></pre>

<details>
<summary>Fields</summary>

<dl>
<dt>
<code>address: <b>address</b></code>
</dt>
<dd>
 Address of the user who made the pre-order
</dd>
<dt>
<code>amount: u64</code>
</dt>
<dd>
 Number of packs pre-ordered
</dd>
</dl>

</details>

<a id="ufc_strike_packs_PackInfo"></a>

## Resource `PackInfo`

Pack information structure for view functions.

<pre><code><b>struct</b> <a href="packs.md#ufc_strike_packs_PackInfo">PackInfo</a> <b>has</b> copy, drop
</code></pre>

<details>
<summary>Fields</summary>

<dl>
<dt>
<code>description: <a href="../../aptos-framework/../aptos-stdlib/../move-stdlib/doc/string.md#0x1_string_String">string::String</a></code>
</dt>
<dd>
 Description of the pack
</dd>
<dt>
<code>uri: <a href="../../aptos-framework/../aptos-stdlib/../move-stdlib/doc/string.md#0x1_string_String">string::String</a></code>
</dt>
<dd>
 URI for pack metadata
</dd>
<dt>
<code>price: u64</code>
</dt>
<dd>
 Price in octas (smallest unit of APT)
</dd>
<dt>
<code>supply: u64</code>
</dt>
<dd>
 Total supply of packs
</dd>
<dt>
<code>max_purchase: u64</code>
</dt>
<dd>
 Maximum packs a user can purchase in one transaction
</dd>
<dt>
<code>max_preorder: u64</code>
</dt>
<dd>
 Maximum packs a user can pre-order
</dd>
<dt>
<code>moments_per_pack: u64</code>
</dt>
<dd>
 Number of moments each pack contains
</dd>
<dt>
<code>released: bool</code>
</dt>
<dd>
 Whether the pack has been released (also indicates if sales are open)
</dd>
<dt>
<code>total_preorders: u64</code>
</dt>
<dd>
 Total amount of pre-orders across all users
</dd>
<dt>
<code>reserved_packs: u64</code>
</dt>
<dd>
 Packs reserved for creator (not available for sale)
</dd>
<dt>
<code>preorder_enabled: bool</code>
</dt>
<dd>
 Whether preorders are currently enabled
</dd>
</dl>

</details>

<a id="@Events_0"></a>

## Events

<a id="ufc_strike_packs_MomentDrawnEvent"></a>

### Event `MomentDrawnEvent`

Event for when a moment is drawn from a pack.

<pre><code><b>struct</b> <a href="packs.md#ufc_strike_packs_MomentDrawnEvent">MomentDrawnEvent</a> <b>has</b> copy, drop, store
</code></pre>

<details>
<summary>Fields</summary>

<dl>
<dt>
<code>collection_name: <a href="../../aptos-framework/../aptos-stdlib/../move-stdlib/doc/string.md#0x1_string_String">string::String</a></code>
</dt>
<dd>
 Name of the collection from which the moment was drawn
</dd>
<dt>
<code>serial_number: u32</code>
</dt>
<dd>
 Serial number of the drawn moment
</dd>
</dl>

</details>

<a id="ufc_strike_packs_PacksRemovedFromSaleEvent"></a>

### Event `PacksRemovedFromSaleEvent`

Event for when packs are removed from sale.

<pre><code><b>struct</b> <a href="packs.md#ufc_strike_packs_PacksRemovedFromSaleEvent">PacksRemovedFromSaleEvent</a> <b>has</b> copy, drop, store
</code></pre>

<details>
<summary>Fields</summary>

<dl>
<dt>
<code>pack_name: <a href="../../aptos-framework/../aptos-stdlib/../move-stdlib/doc/string.md#0x1_string_String">string::String</a></code>
</dt>
<dd>
 Name of the pack from which packs were removed
</dd>
<dt>
<code>amount: u64</code>
</dt>
<dd>
 Number of packs removed from sale
</dd>
<dt>
<code>token_addresses: <a href="../../aptos-framework/../aptos-stdlib/../move-stdlib/doc/vector.md#0x1_vector">vector</a>&lt;<b>address</b>&gt;</code>
</dt>
<dd>
 Addresses of the removed pack tokens
</dd>
</dl>

</details>

<a id="@Constants_0"></a>

## Constants

<a id="ufc_strike_packs_E_NOT_AUTHORIZED"></a>

The caller is not authorized to perform this action

<pre><code><b>const</b> <a href="packs.md#ufc_strike_packs_E_NOT_AUTHORIZED">E_NOT_AUTHORIZED</a>: u64 = 1;
</code></pre>

<a id="ufc_strike_packs_E_PACK_ALREADY_OPENED"></a>

The pack has already been opened

<pre><code><b>const</b> <a href="packs.md#ufc_strike_packs_E_PACK_ALREADY_OPENED">E_PACK_ALREADY_OPENED</a>: u64 = 2;
</code></pre>

<a id="ufc_strike_packs_E_NO_PACKS_AVAILABLE"></a>

No packs are available for purchase

<pre><code><b>const</b> <a href="packs.md#ufc_strike_packs_E_NO_PACKS_AVAILABLE">E_NO_PACKS_AVAILABLE</a>: u64 = 3;
</code></pre>

<a id="ufc_strike_packs_E_PREORDER_EXCEEDS_LIMIT"></a>

Pre-order amount exceeds the maximum allowed limit

<pre><code><b>const</b> <a href="packs.md#ufc_strike_packs_E_PREORDER_EXCEEDS_LIMIT">E_PREORDER_EXCEEDS_LIMIT</a>: u64 = 4;
</code></pre>

<a id="ufc_strike_packs_E_NOT_RELEASED"></a>

The pack sale is not currently open

<pre><code><b>const</b> <a href="packs.md#ufc_strike_packs_E_NOT_RELEASED">E_NOT_RELEASED</a>: u64 = 5;
</code></pre>

<a id="ufc_strike_packs_E_PACK_ALREADY_EXISTS"></a>

A pack with this name already exists

<pre><code><b>const</b> <a href="packs.md#ufc_strike_packs_E_PACK_ALREADY_EXISTS">E_PACK_ALREADY_EXISTS</a>: u64 = 6;
</code></pre>

<a id="ufc_strike_packs_E_PACK_ALREADY_RELEASED"></a>

The pack has already been released

<pre><code><b>const</b> <a href="packs.md#ufc_strike_packs_E_PACK_ALREADY_RELEASED">E_PACK_ALREADY_RELEASED</a>: u64 = 7;
</code></pre>

<a id="ufc_strike_packs_E_PREORDER_EXCEEDS_SUPPLY"></a>

Total pre-orders exceed the available supply

<pre><code><b>const</b> <a href="packs.md#ufc_strike_packs_E_PREORDER_EXCEEDS_SUPPLY">E_PREORDER_EXCEEDS_SUPPLY</a>: u64 = 8;
</code></pre>

<a id="ufc_strike_packs_E_PURCHASE_EXCEEDS_LIMIT"></a>

Purchase amount exceeds the maximum allowed limit

<pre><code><b>const</b> <a href="packs.md#ufc_strike_packs_E_PURCHASE_EXCEEDS_LIMIT">E_PURCHASE_EXCEEDS_LIMIT</a>: u64 = 9;
</code></pre>

<a id="ufc_strike_packs_E_ALREADY_PREORDERED"></a>

User has already made a pre-order for this pack

<pre><code><b>const</b> <a href="packs.md#ufc_strike_packs_E_ALREADY_PREORDERED">E_ALREADY_PREORDERED</a>: u64 = 10;
</code></pre>

<a id="ufc_strike_packs_E_RESERVE_EXCEEDS_SUPPLY"></a>

Reserved packs exceed the total supply

<pre><code><b>const</b> <a href="packs.md#ufc_strike_packs_E_RESERVE_EXCEEDS_SUPPLY">E_RESERVE_EXCEEDS_SUPPLY</a>: u64 = 11;
</code></pre>

<a id="ufc_strike_packs_E_INVALID_SLOTS_COUNT"></a>

Invalid number of slots in the distribution

<pre><code><b>const</b> <a href="packs.md#ufc_strike_packs_E_INVALID_SLOTS_COUNT">E_INVALID_SLOTS_COUNT</a>: u64 = 12;
</code></pre>

<a id="ufc_strike_packs_E_INVALID_MOMENTS_COUNT"></a>

Invalid number of moments in the distribution

<pre><code><b>const</b> <a href="packs.md#ufc_strike_packs_E_INVALID_MOMENTS_COUNT">E_INVALID_MOMENTS_COUNT</a>: u64 = 13;
</code></pre>

<a id="ufc_strike_packs_E_COLLECTION_DOES_NOT_EXIST"></a>

The specified collection does not exist

<pre><code><b>const</b> <a href="packs.md#ufc_strike_packs_E_COLLECTION_DOES_NOT_EXIST">E_COLLECTION_DOES_NOT_EXIST</a>: u64 = 14;
</code></pre>

<a id="ufc_strike_packs_E_NOT_ADMIN"></a>

The caller is not an admin

<pre><code><b>const</b> <a href="packs.md#ufc_strike_packs_E_NOT_ADMIN">E_NOT_ADMIN</a>: u64 = 15;
</code></pre>

<a id="ufc_strike_packs_E_ADMIN_ALREADY_EXISTS"></a>

Admin already exists

<pre><code><b>const</b> <a href="packs.md#ufc_strike_packs_E_ADMIN_ALREADY_EXISTS">E_ADMIN_ALREADY_EXISTS</a>: u64 = 16;
</code></pre>

<a id="ufc_strike_packs_E_ADMIN_NOT_FOUND"></a>

Admin not found

<pre><code><b>const</b> <a href="packs.md#ufc_strike_packs_E_ADMIN_NOT_FOUND">E_ADMIN_NOT_FOUND</a>: u64 = 17;
</code></pre>

<a id="ufc_strike_packs_E_NOT_OWNER"></a>

The caller is not the owner

<pre><code><b>const</b> <a href="packs.md#ufc_strike_packs_E_NOT_OWNER">E_NOT_OWNER</a>: u64 = 18;
</code></pre>

<a id="ufc_strike_packs_E_ADMIN_CANNOT_REMOVE_OWNER"></a>

Admin cannot remove the owner

<pre><code><b>const</b> <a href="packs.md#ufc_strike_packs_E_ADMIN_CANNOT_REMOVE_OWNER">E_ADMIN_CANNOT_REMOVE_OWNER</a>: u64 = 19;
</code></pre>

<a id="ufc_strike_packs_E_PACK_NOT_FOUND"></a>

The specified pack was not found

<pre><code><b>const</b> <a href="packs.md#ufc_strike_packs_E_PACK_NOT_FOUND">E_PACK_NOT_FOUND</a>: u64 = 20;
</code></pre>

<a id="ufc_strike_packs_E_INVALID_AMOUNT"></a>

Invalid amount provided

<pre><code><b>const</b> <a href="packs.md#ufc_strike_packs_E_INVALID_AMOUNT">E_INVALID_AMOUNT</a>: u64 = 21;
</code></pre>

<a id="ufc_strike_packs_E_PACK_TOKEN_NOT_FOUND"></a>

Pack token not found

<pre><code><b>const</b> <a href="packs.md#ufc_strike_packs_E_PACK_TOKEN_NOT_FOUND">E_PACK_TOKEN_NOT_FOUND</a>: u64 = 22;
</code></pre>

<a id="ufc_strike_packs_E_INVALID_SLOT_INDEX"></a>

Invalid slot index

<pre><code><b>const</b> <a href="packs.md#ufc_strike_packs_E_INVALID_SLOT_INDEX">E_INVALID_SLOT_INDEX</a>: u64 = 23;
</code></pre>

<a id="ufc_strike_packs_E_BATCH_SIZE_EXCEEDS_REMAINING_TO_MINT"></a>

Batch size exceeds remaining packs to mint

<pre><code><b>const</b> <a href="packs.md#ufc_strike_packs_E_BATCH_SIZE_EXCEEDS_REMAINING_TO_MINT">E_BATCH_SIZE_EXCEEDS_REMAINING_TO_MINT</a>: u64 = 24;
</code></pre>

<a id="ufc_strike_packs_E_PREORDER_NOT_ENABLED"></a>

Preorders are not enabled

<pre><code><b>const</b> <a href="packs.md#ufc_strike_packs_E_PREORDER_NOT_ENABLED">E_PREORDER_NOT_ENABLED</a>: u64 = 25;
</code></pre>

<a id="ufc_strike_packs_E_PREORDER_SHOULD_BE_DISABLED"></a>

Preorders should be disabled before release

<pre><code><b>const</b> <a href="packs.md#ufc_strike_packs_E_PREORDER_SHOULD_BE_DISABLED">E_PREORDER_SHOULD_BE_DISABLED</a>: u64 = 26;
</code></pre>

<a id="ufc_strike_packs_E_NO_COLLECTIONS_AVAILABLE"></a>

No collections are available

<pre><code><b>const</b> <a href="packs.md#ufc_strike_packs_E_NO_COLLECTIONS_AVAILABLE">E_NO_COLLECTIONS_AVAILABLE</a>: u64 = 27;
</code></pre>

<a id="ufc_strike_packs_E_INVALID_RESERVED_PACKS_COUNT"></a>

Invalid reserved packs count

<pre><code><b>const</b> <a href="packs.md#ufc_strike_packs_E_INVALID_RESERVED_PACKS_COUNT">E_INVALID_RESERVED_PACKS_COUNT</a>: u64 = 28;
</code></pre>

<a id="ufc_strike_packs_E_INVALID_PACKS_FOR_SALE_COUNT"></a>

Invalid packs for sale count

<pre><code><b>const</b> <a href="packs.md#ufc_strike_packs_E_INVALID_PACKS_FOR_SALE_COUNT">E_INVALID_PACKS_FOR_SALE_COUNT</a>: u64 = 29;
</code></pre>

<a id="ufc_strike_packs_BURNER_ADDRESS"></a>

Burner address where tokens are sent to be "burned"

<pre><code><b>const</b> <a href="packs.md#ufc_strike_packs_BURNER_ADDRESS">BURNER_ADDRESS</a>: <b>address</b> = @0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff;
</code></pre>

<a id="ufc_strike_packs_init_module"></a>

## Function `init_module`

Initializes the Packs module for an object.

<pre><code><b>fun</b> <a href="packs.md#ufc_strike_packs_init_module">init_module</a>(object: &<a href="../../aptos-framework/../aptos-stdlib/../move-stdlib/doc/signer.md#0x1_signer">signer</a>)
</code></pre>

<a id="ufc_strike_packs_add_admin"></a>

## Function `add_admin`

Add a new admin (only existing admins can add new admins).

<pre><code><b>public</b> entry <b>fun</b> <a href="packs.md#ufc_strike_packs_add_admin">add_admin</a>(admin: &<a href="../../aptos-framework/../aptos-stdlib/../move-stdlib/doc/signer.md#0x1_signer">signer</a>, new_admin_addr: <b>address</b>)
</code></pre>

<a id="ufc_strike_packs_remove_admin"></a>

## Function `remove_admin`

Remove an admin (only existing admins can remove admins).

<pre><code><b>public</b> entry <b>fun</b> <a href="packs.md#ufc_strike_packs_remove_admin">remove_admin</a>(admin: &<a href="../../aptos-framework/../aptos-stdlib/../move-stdlib/doc/signer.md#0x1_signer">signer</a>, admin_to_remove: <b>address</b>)
</code></pre>

<a id="ufc_strike_packs_create_pack"></a>

## Function `create_pack`

Creates a simple pack with its own distribution.

<pre><code><b>public</b> entry <b>fun</b> <a href="packs.md#ufc_strike_packs_create_pack">create_pack</a>(
    creator: &<a href="../../aptos-framework/../aptos-stdlib/../move-stdlib/doc/signer.md#0x1_signer">signer</a>,
    pack_name: <a href="../../aptos-framework/../aptos-stdlib/../move-stdlib/doc/string.md#0x1_string_String">string::String</a>,
    description: <a href="../../aptos-framework/../aptos-stdlib/../move-stdlib/doc/string.md#0x1_string_String">string::String</a>,
    uri: <a href="../../aptos-framework/../aptos-stdlib/../move-stdlib/doc/string.md#0x1_string_String">string::String</a>,
    price: u64,
    supply: u64,
    max_purchase: u64,
    max_preorder: u64,
    moments_per_pack: u64,
    reserved_packs: u64,
    mutable_description: bool,
    mutable_royalty: bool,
    mutable_uri: bool,
    mutable_token_description: bool,
    mutable_token_name: bool,
    mutable_token_properties: bool,
    mutable_token_uri: bool,
    tokens_burnable_by_creator: bool,
    tokens_freezable_by_creator: bool,
    royalty_numerator: u64,
    royalty_denominator: u64
)
</code></pre>

<a id="ufc_strike_packs_add_collections_to_distribution"></a>

## Function `add_collections_to_distribution`

Add collections to a pack's distribution (global or reserved).

<pre><code><b>public</b> entry <b>fun</b> <a href="packs.md#ufc_strike_packs_add_collections_to_distribution">add_collections_to_distribution</a>(
    creator: &<a href="../../aptos-framework/../aptos-stdlib/../move-stdlib/doc/signer.md#0x1_signer">signer</a>,
    pack_name: <a href="../../aptos-framework/../aptos-stdlib/../move-stdlib/doc/string.md#0x1_string_String">string::String</a>,
    slot: u64,
    collection_names: <a href="../../aptos-framework/../aptos-stdlib/../move-stdlib/doc/vector.md#0x1_vector">vector</a>&lt;<a href="../../aptos-framework/../aptos-stdlib/../move-stdlib/doc/string.md#0x1_string_String">string::String</a>&gt;,
    quantities: <a href="../../aptos-framework/../aptos-stdlib/../move-stdlib/doc/vector.md#0x1_vector">vector</a>&lt;u64&gt;,
    global_distribution: bool
)
</code></pre>

<a id="ufc_strike_packs_add_serial_numbers"></a>

## Function `add_serial_numbers`

Add serial numbers to a collection in a pack.

<pre><code><b>public</b> entry <b>fun</b> <a href="packs.md#ufc_strike_packs_add_serial_numbers">add_serial_numbers</a>(
    admin: &<a href="../../aptos-framework/../aptos-stdlib/../move-stdlib/doc/signer.md#0x1_signer">signer</a>,
    pack_name: <a href="../../aptos-framework/../aptos-stdlib/../move-stdlib/doc/string.md#0x1_string_String">string::String</a>,
    collection_name: <a href="../../aptos-framework/../aptos-stdlib/../move-stdlib/doc/string.md#0x1_string_String">string::String</a>,
    serial_numbers: <a href="../../aptos-framework/../aptos-stdlib/../move-stdlib/doc/vector.md#0x1_vector">vector</a>&lt;u32&gt;
)
</code></pre>

<a id="ufc_strike_packs_add_serial_numbers_with_range"></a>

## Function `add_serial_numbers_with_range`

Add serial numbers to a collection with range.

<pre><code><b>public</b> entry <b>fun</b> <a href="packs.md#ufc_strike_packs_add_serial_numbers_with_range">add_serial_numbers_with_range</a>(
    creator: &<a href="../../aptos-framework/../aptos-stdlib/../move-stdlib/doc/signer.md#0x1_signer">signer</a>,
    pack_name: <a href="../../aptos-framework/../aptos-stdlib/../move-stdlib/doc/string.md#0x1_string_String">string::String</a>,
    collection_name: <a href="../../aptos-framework/../aptos-stdlib/../move-stdlib/doc/string.md#0x1_string_String">string::String</a>,
    start_serial: u32,
    end_serial: u32
)
</code></pre>

<a id="ufc_strike_packs_mint_packs_batch"></a>

## Function `mint_packs_batch`

Mint packs in batches and store them for later transfer.

<pre><code><b>public</b> entry <b>fun</b> <a href="packs.md#ufc_strike_packs_mint_packs_batch">mint_packs_batch</a>(
    creator: &<a href="../../aptos-framework/../aptos-stdlib/../move-stdlib/doc/signer.md#0x1_signer">signer</a>,
    pack_name: <a href="../../aptos-framework/../aptos-stdlib/../move-stdlib/doc/string.md#0x1_string_String">string::String</a>,
    batch_size: u64,
    global_distribution: bool
)
</code></pre>

<a id="ufc_strike_packs_set_max_purchase"></a>

## Function `set_max_purchase`

Set max purchase limit for a specific pack.

<pre><code><b>public</b> entry <b>fun</b> <a href="packs.md#ufc_strike_packs_set_max_purchase">set_max_purchase</a>(
    creator: &<a href="../../aptos-framework/../aptos-stdlib/../move-stdlib/doc/signer.md#0x1_signer">signer</a>,
    pack_name: <a href="../../aptos-framework/../aptos-stdlib/../move-stdlib/doc/string.md#0x1_string_String">string::String</a>,
    new_max: u64
)
</code></pre>

<a id="ufc_strike_packs_set_max_preorder"></a>

## Function `set_max_preorder`

Set max preorder limit for a specific pack.

<pre><code><b>public</b> entry <b>fun</b> <a href="packs.md#ufc_strike_packs_set_max_preorder">set_max_preorder</a>(
    creator: &<a href="../../aptos-framework/../aptos-stdlib/../move-stdlib/doc/signer.md#0x1_signer">signer</a>,
    pack_name: <a href="../../aptos-framework/../aptos-stdlib/../move-stdlib/doc/string.md#0x1_string_String">string::String</a>,
    new_max: u64
)
</code></pre>

<a id="ufc_strike_packs_set_pack_price"></a>

## Function `set_pack_price`

Set pack price (can be updated at any time).

<pre><code><b>public</b> entry <b>fun</b> <a href="packs.md#ufc_strike_packs_set_pack_price">set_pack_price</a>(
    creator: &<a href="../../aptos-framework/../aptos-stdlib/../move-stdlib/doc/signer.md#0x1_signer">signer</a>,
    pack_name: <a href="../../aptos-framework/../aptos-stdlib/../move-stdlib/doc/string.md#0x1_string_String">string::String</a>,
    new_price: u64
)
</code></pre>

<a id="ufc_strike_packs_set_reserved_packs"></a>

## Function `set_reserved_packs`

Set reserved packs for a specific pack (only before release).

<pre><code><b>public</b> entry <b>fun</b> <a href="packs.md#ufc_strike_packs_set_reserved_packs">set_reserved_packs</a>(
    creator: &<a href="../../aptos-framework/../aptos-stdlib/../move-stdlib/doc/signer.md#0x1_signer">signer</a>,
    pack_name: <a href="../../aptos-framework/../aptos-stdlib/../move-stdlib/doc/string.md#0x1_string_String">string::String</a>,
    new_reserved: u64
)
</code></pre>

<a id="ufc_strike_packs_pre_order"></a>

## Function `pre_order`

Allows users to pre-order packs before they are minted (whitelisted by creator signature).

<pre><code><b>public</b> entry <b>fun</b> <a href="packs.md#ufc_strike_packs_pre_order">pre_order</a>(
    user: &<a href="../../aptos-framework/../aptos-stdlib/../move-stdlib/doc/signer.md#0x1_signer">signer</a>,
    creator: &<a href="../../aptos-framework/../aptos-stdlib/../move-stdlib/doc/signer.md#0x1_signer">signer</a>,
    pack_name: <a href="../../aptos-framework/../aptos-stdlib/../move-stdlib/doc/string.md#0x1_string_String">string::String</a>,
    amount: u64
)
</code></pre>

<a id="ufc_strike_packs_assign_pre_order"></a>

## Function `assign_pre_order`

Allows creator to pre-order packs for users without payment (free pre-orders).

<pre><code><b>public</b> entry <b>fun</b> <a href="packs.md#ufc_strike_packs_assign_pre_order">assign_pre_order</a>(
    creator: &<a href="../../aptos-framework/../aptos-stdlib/../move-stdlib/doc/signer.md#0x1_signer">signer</a>,
    pack_name: <a href="../../aptos-framework/../aptos-stdlib/../move-stdlib/doc/string.md#0x1_string_String">string::String</a>,
    user_addr: <b>address</b>,
    amount: u64
)
</code></pre>

<a id="ufc_strike_packs_set_preorder_enabled"></a>

## Function `set_preorder_enabled`

Set preorder status (only admin can call this).

<pre><code><b>public</b> entry <b>fun</b> <a href="packs.md#ufc_strike_packs_set_preorder_enabled">set_preorder_enabled</a>(
    admin: &<a href="../../aptos-framework/../aptos-stdlib/../move-stdlib/doc/signer.md#0x1_signer">signer</a>,
    pack_name: <a href="../../aptos-framework/../aptos-stdlib/../move-stdlib/doc/string.md#0x1_string_String">string::String</a>,
    enabled: bool
)
</code></pre>

<a id="ufc_strike_packs_preorder_release_batch"></a>

## Function `preorder_release_batch`

Release preorders by transferring already minted packs (only admin can call this, processes up to 100 users per transaction).

<pre><code><b>public</b> entry <b>fun</b> <a href="packs.md#ufc_strike_packs_preorder_release_batch">preorder_release_batch</a>(
    admin: &<a href="../../aptos-framework/../aptos-stdlib/../move-stdlib/doc/signer.md#0x1_signer">signer</a>,
    pack_name: <a href="../../aptos-framework/../aptos-stdlib/../move-stdlib/doc/string.md#0x1_string_String">string::String</a>,
    batch_size: u64
)
</code></pre>

<a id="ufc_strike_packs_release_pack"></a>

## Function `release_pack`

Releases pack and transfers pre-orders using already minted packs, sets released=true.

<pre><code><b>public</b> entry <b>fun</b> <a href="packs.md#ufc_strike_packs_release_pack">release_pack</a>(
    creator: &<a href="../../aptos-framework/../aptos-stdlib/../move-stdlib/doc/signer.md#0x1_signer">signer</a>,
    pack_name: <a href="../../aptos-framework/../aptos-stdlib/../move-stdlib/doc/string.md#0x1_string_String">string::String</a>
)
</code></pre>

<a id="ufc_strike_packs_remove_pack_from_sale_by_address"></a>

## Function `remove_pack_from_sale_by_address`

Remove a specific pack token from packs_for_sale (admin only).

<pre><code><b>public</b> entry <b>fun</b> <a href="packs.md#ufc_strike_packs_remove_pack_from_sale_by_address">remove_pack_from_sale_by_address</a>(
    admin: &<a href="../../aptos-framework/../aptos-stdlib/../move-stdlib/doc/signer.md#0x1_signer">signer</a>,
    pack_name: <a href="../../aptos-framework/../aptos-stdlib/../move-stdlib/doc/string.md#0x1_string_String">string::String</a>,
    token_address: <b>address</b>
)
</code></pre>

<a id="ufc_strike_packs_remove_packs_from_sale_by_quantity"></a>

## Function `remove_packs_from_sale_by_quantity`

Remove a specific quantity of packs from sale and emit event with token addresses (admin only).

<pre><code><b>public</b> entry <b>fun</b> <a href="packs.md#ufc_strike_packs_remove_packs_from_sale_by_quantity">remove_packs_from_sale_by_quantity</a>(
    admin: &<a href="../../aptos-framework/../aptos-stdlib/../move-stdlib/doc/signer.md#0x1_signer">signer</a>,
    pack_name: <a href="../../aptos-framework/../aptos-stdlib/../move-stdlib/doc/string.md#0x1_string_String">string::String</a>,
    amount: u64
)
</code></pre>

<a id="ufc_strike_packs_remove_serial_numbers_global"></a>

## Function `remove_serial_numbers_global`

Remove specific serial numbers from collections and adjust pack consistency for global distribution (admin only).

This function removes serial numbers from collections and burns the corresponding pack from sale
to maintain system consistency. The amount of serials removed must match the slots count.
The pack is transferred to the burner address and removed from packs_for_sale.

<pre><code><b>public</b> entry <b>fun</b> <a href="packs.md#ufc_strike_packs_remove_serial_numbers_global">remove_serial_numbers_global</a>(
    admin: &<a href="../../aptos-framework/../aptos-stdlib/../move-stdlib/doc/signer.md#0x1_signer">signer</a>,
    pack_name: <a href="../../aptos-framework/../aptos-stdlib/../move-stdlib/doc/string.md#0x1_string_String">string::String</a>,
    collection_names: <a href="../../aptos-framework/../aptos-stdlib/../move-stdlib/doc/vector.md#0x1_vector">vector</a>&lt;<a href="../../aptos-framework/../aptos-stdlib/../move-stdlib/doc/string.md#0x1_string_String">string::String</a>&gt;,
    serial_numbers: <a href="../../aptos-framework/../aptos-stdlib/../move-stdlib/doc/vector.md#0x1_vector">vector</a>&lt;u32&gt;
)
</code></pre>

<a id="ufc_strike_packs_remove_serial_numbers_reserved"></a>

## Function `remove_serial_numbers_reserved`

Remove specific serial numbers from collections and adjust pack consistency for reserved distribution (admin only).

This function removes serial numbers from collections and burns the corresponding reserved pack
to maintain system consistency. The amount of serials removed must match the slots count.
The specified token_address is transferred to the burner address and removed from reserved packs.

<pre><code><b>public</b> entry <b>fun</b> <a href="packs.md#ufc_strike_packs_remove_serial_numbers_reserved">remove_serial_numbers_reserved</a>(
    admin: &<a href="../../aptos-framework/../aptos-stdlib/../move-stdlib/doc/signer.md#0x1_signer">signer</a>,
    pack_name: <a href="../../aptos-framework/../aptos-stdlib/../move-stdlib/doc/string.md#0x1_string_String">string::String</a>,
    collection_names: <a href="../../aptos-framework/../aptos-stdlib/../move-stdlib/doc/vector.md#0x1_vector">vector</a>&lt;<a href="../../aptos-framework/../aptos-stdlib/../move-stdlib/doc/string.md#0x1_string_String">string::String</a>&gt;,
    serial_numbers: <a href="../../aptos-framework/../aptos-stdlib/../move-stdlib/doc/vector.md#0x1_vector">vector</a>&lt;u32&gt;,
    token_address: <b>address</b>
)
</code></pre>

<a id="ufc_strike_packs_purchase"></a>

## Function `purchase`

Purchase packs (when sale is open).

<pre><code><b>public</b> entry <b>fun</b> <a href="packs.md#ufc_strike_packs_purchase">purchase</a>(
    user: &<a href="../../aptos-framework/../aptos-stdlib/../move-stdlib/doc/signer.md#0x1_signer">signer</a>,
    creator: &<a href="../../aptos-framework/../aptos-stdlib/../move-stdlib/doc/signer.md#0x1_signer">signer</a>,
    pack_name: <a href="../../aptos-framework/../aptos-stdlib/../move-stdlib/doc/string.md#0x1_string_String">string::String</a>,
    amount: u64
)
</code></pre>

<a id="ufc_strike_packs_assign_purchase"></a>

## Function `assign_purchase`

Allows creator to purchase packs for users without payment (free purchases).

<pre><code><b>public</b> entry <b>fun</b> <a href="packs.md#ufc_strike_packs_assign_purchase">assign_purchase</a>(
    creator: &<a href="../../aptos-framework/../aptos-stdlib/../move-stdlib/doc/signer.md#0x1_signer">signer</a>,
    pack_name: <a href="../../aptos-framework/../aptos-stdlib/../move-stdlib/doc/string.md#0x1_string_String">string::String</a>,
    user_addr: <b>address</b>,
    amount: u64
)
</code></pre>

<a id="ufc_strike_packs_open"></a>

## Function `open`

Open a pack to reveal its contents.

<pre><code><b>entry</b> <b>fun</b> <a href="packs.md#ufc_strike_packs_open">open</a>(
    user: &<a href="../../aptos-framework/../aptos-stdlib/../move-stdlib/doc/signer.md#0x1_signer">signer</a>,
    creator: &<a href="../../aptos-framework/../aptos-stdlib/../move-stdlib/doc/signer.md#0x1_signer">signer</a>,
    pack_name: <a href="../../aptos-framework/../aptos-stdlib/../move-stdlib/doc/string.md#0x1_string_String">string::String</a>,
    pack_token_id: <b>address</b>
)
</code></pre>

<a id="ufc_strike_packs_is_address_admin"></a>

## Function `is_address_admin`

Check if an address is admin.

<pre><code><b>public</b> <b>fun</b> <a href="packs.md#ufc_strike_packs_is_address_admin">is_address_admin</a>(admin_addr: <b>address</b>): bool
</code></pre>

<a id="ufc_strike_packs_is_address_owner"></a>

## Function `is_address_owner`

Check if an address is owner.

<pre><code><b>public</b> <b>fun</b> <a href="packs.md#ufc_strike_packs_is_address_owner">is_address_owner</a>(owner_addr: <b>address</b>): bool
</code></pre>

<a id="ufc_strike_packs_get_owner"></a>

## Function `get_owner`

Get the owner address of the contract.

<pre><code><b>public</b> <b>fun</b> <a href="packs.md#ufc_strike_packs_get_owner">get_owner</a>(): <b>address</b>
</code></pre>

<a id="ufc_strike_packs_get_packs_for_sale_available"></a>

## Function `get_packs_for_sale_available`

Get number of packs available for sale.

<pre><code><b>public</b> <b>fun</b> <a href="packs.md#ufc_strike_packs_get_packs_for_sale_available">get_packs_for_sale_available</a>(
    _creator_addr: <b>address</b>,
    pack_name: <a href="../../aptos-framework/../aptos-stdlib/../move-stdlib/doc/string.md#0x1_string_String">string::String</a>
): u64
</code></pre>

<a id="ufc_strike_packs_get_remaining_packs_to_mint"></a>

## Function `get_remaining_packs_to_mint`

Get total packs that can still be minted (only if pack is not released).

<pre><code><b>public</b> <b>fun</b> <a href="packs.md#ufc_strike_packs_get_remaining_packs_to_mint">get_remaining_packs_to_mint</a>(
    _creator_addr: <b>address</b>,
    pack_name: <a href="../../aptos-framework/../aptos-stdlib/../move-stdlib/doc/string.md#0x1_string_String">string::String</a>
): u64
</code></pre>

<a id="ufc_strike_packs_get_pack_info"></a>

## Function `get_pack_info`

Get pack information.

<pre><code><b>public</b> <b>fun</b> <a href="packs.md#ufc_strike_packs_get_pack_info">get_pack_info</a>(
    _creator_addr: <b>address</b>,
    pack_name: <a href="../../aptos-framework/../aptos-stdlib/../move-stdlib/doc/string.md#0x1_string_String">string::String</a>
): <a href="packs.md#ufc_strike_packs_PackInfo">PackInfo</a>
</code></pre>

<a id="ufc_strike_packs_get_pack_description"></a>

## Function `get_pack_description`

Get pack description.

<pre><code><b>public</b> <b>fun</b> <a href="packs.md#ufc_strike_packs_get_pack_description">get_pack_description</a>(
    _creator_addr: <b>address</b>,
    pack_name: <a href="../../aptos-framework/../aptos-stdlib/../move-stdlib/doc/string.md#0x1_string_String">string::String</a>
): <a href="../../aptos-framework/../aptos-stdlib/../move-stdlib/doc/string.md#0x1_string_String">string::String</a>
</code></pre>

<a id="ufc_strike_packs_get_pack_uri"></a>

## Function `get_pack_uri`

Get pack URI.

<pre><code><b>public</b> <b>fun</b> <a href="packs.md#ufc_strike_packs_get_pack_uri">get_pack_uri</a>(
    _creator_addr: <b>address</b>,
    pack_name: <a href="../../aptos-framework/../aptos-stdlib/../move-stdlib/doc/string.md#0x1_string_String">string::String</a>
): <a href="../../aptos-framework/../aptos-stdlib/../move-stdlib/doc/string.md#0x1_string_String">string::String</a>
</code></pre>

<a id="ufc_strike_packs_get_pack_price"></a>

## Function `get_pack_price`

Get pack price.

<pre><code><b>public</b> <b>fun</b> <a href="packs.md#ufc_strike_packs_get_pack_price">get_pack_price</a>(
    _creator_addr: <b>address</b>,
    pack_name: <a href="../../aptos-framework/../aptos-stdlib/../move-stdlib/doc/string.md#0x1_string_String">string::String</a>
): u64
</code></pre>

<a id="ufc_strike_packs_get_pack_supply"></a>

## Function `get_pack_supply`

Get pack supply.

<pre><code><b>public</b> <b>fun</b> <a href="packs.md#ufc_strike_packs_get_pack_supply">get_pack_supply</a>(
    _creator_addr: <b>address</b>,
    pack_name: <a href="../../aptos-framework/../aptos-stdlib/../move-stdlib/doc/string.md#0x1_string_String">string::String</a>
): u64
</code></pre>

<a id="ufc_strike_packs_get_pack_max_purchase"></a>

## Function `get_pack_max_purchase`

Get pack max purchase.

<pre><code><b>public</b> <b>fun</b> <a href="packs.md#ufc_strike_packs_get_pack_max_purchase">get_pack_max_purchase</a>(
    _creator_addr: <b>address</b>,
    pack_name: <a href="../../aptos-framework/../aptos-stdlib/../move-stdlib/doc/string.md#0x1_string_String">string::String</a>
): u64
</code></pre>

<a id="ufc_strike_packs_get_pack_max_preorder"></a>

## Function `get_pack_max_preorder`

Get pack max preorder.

<pre><code><b>public</b> <b>fun</b> <a href="packs.md#ufc_strike_packs_get_pack_max_preorder">get_pack_max_preorder</a>(
    _creator_addr: <b>address</b>,
    pack_name: <a href="../../aptos-framework/../aptos-stdlib/../move-stdlib/doc/string.md#0x1_string_String">string::String</a>
): u64
</code></pre>

<a id="ufc_strike_packs_get_pack_moments_per_pack"></a>

## Function `get_pack_moments_per_pack`

Get pack moments per pack.

<pre><code><b>public</b> <b>fun</b> <a href="packs.md#ufc_strike_packs_get_pack_moments_per_pack">get_pack_moments_per_pack</a>(
    _creator_addr: <b>address</b>,
    pack_name: <a href="../../aptos-framework/../aptos-stdlib/../move-stdlib/doc/string.md#0x1_string_String">string::String</a>
): u64
</code></pre>

<a id="ufc_strike_packs_get_pack_released"></a>

## Function `get_pack_released`

Get pack released status.

<pre><code><b>public</b> <b>fun</b> <a href="packs.md#ufc_strike_packs_get_pack_released">get_pack_released</a>(
    _creator_addr: <b>address</b>,
    pack_name: <a href="../../aptos-framework/../aptos-stdlib/../move-stdlib/doc/string.md#0x1_string_String">string::String</a>
): bool
</code></pre>

<a id="ufc_strike_packs_get_pack_total_preorders"></a>

## Function `get_pack_total_preorders`

Get pack total preorders.

<pre><code><b>public</b> <b>fun</b> <a href="packs.md#ufc_strike_packs_get_pack_total_preorders">get_pack_total_preorders</a>(
    _creator_addr: <b>address</b>,
    pack_name: <a href="../../aptos-framework/../aptos-stdlib/../move-stdlib/doc/string.md#0x1_string_String">string::String</a>
): u64
</code></pre>

<a id="ufc_strike_packs_get_pack_reserved_packs"></a>

## Function `get_pack_reserved_packs`

Get pack reserved packs.

<pre><code><b>public</b> <b>fun</b> <a href="packs.md#ufc_strike_packs_get_pack_reserved_packs">get_pack_reserved_packs</a>(
    _creator_addr: <b>address</b>,
    pack_name: <a href="../../aptos-framework/../aptos-stdlib/../move-stdlib/doc/string.md#0x1_string_String">string::String</a>
): u64
</code></pre>

<a id="ufc_strike_packs_get_pack_preorder_enabled"></a>

## Function `get_pack_preorder_enabled`

Get pack preorder enabled status.

<pre><code><b>public</b> <b>fun</b> <a href="packs.md#ufc_strike_packs_get_pack_preorder_enabled">get_pack_preorder_enabled</a>(
    _creator_addr: <b>address</b>,
    pack_name: <a href="../../aptos-framework/../aptos-stdlib/../move-stdlib/doc/string.md#0x1_string_String">string::String</a>
): bool
</code></pre>

<a id="ufc_strike_packs_get_preorder_count"></a>

## Function `get_preorder_count`

Get total pre-orders for a pack (number of unique users with pre-orders).

<pre><code><b>public</b> <b>fun</b> <a href="packs.md#ufc_strike_packs_get_preorder_count">get_preorder_count</a>(
    _creator_addr: <b>address</b>,
    pack_name: <a href="../../aptos-framework/../aptos-stdlib/../move-stdlib/doc/string.md#0x1_string_String">string::String</a>
): u64
</code></pre>

<a id="ufc_strike_packs_get_total_preorder_amount"></a>

## Function `get_total_preorder_amount`

Get total pre-order amount for a pack (sum of all pre-order amounts).

<pre><code><b>public</b> <b>fun</b> <a href="packs.md#ufc_strike_packs_get_total_preorder_amount">get_total_preorder_amount</a>(
    _creator_addr: <b>address</b>,
    pack_name: <a href="../../aptos-framework/../aptos-stdlib/../move-stdlib/doc/string.md#0x1_string_String">string::String</a>
): u64
</code></pre>

<a id="ufc_strike_packs_get_preorder_by_address"></a>

## Function `get_preorder_by_address`

Get pre-order amount for a specific address.

<pre><code><b>public</b> <b>fun</b> <a href="packs.md#ufc_strike_packs_get_preorder_by_address">get_preorder_by_address</a>(
    _creator_addr: <b>address</b>,
    pack_name: <a href="../../aptos-framework/../aptos-stdlib/../move-stdlib/doc/string.md#0x1_string_String">string::String</a>,
    user_addr: <b>address</b>
): u64
</code></pre>

<a id="ufc_strike_packs_is_preorder_enabled"></a>

## Function `is_preorder_enabled`

Check if preorders are enabled.

<pre><code><b>public</b> <b>fun</b> <a href="packs.md#ufc_strike_packs_is_preorder_enabled">is_preorder_enabled</a>(
    _creator_addr: <b>address</b>,
    pack_name: <a href="../../aptos-framework/../aptos-stdlib/../move-stdlib/doc/string.md#0x1_string_String">string::String</a>
): bool
</code></pre>

<a id="ufc_strike_packs_get_total_preorders_count"></a>

## Function `get_total_preorders_count`

Get total preorders count (including minted and remaining).

<pre><code><b>public</b> <b>fun</b> <a href="packs.md#ufc_strike_packs_get_total_preorders_count">get_total_preorders_count</a>(
    _creator_addr: <b>address</b>,
    pack_name: <a href="../../aptos-framework/../aptos-stdlib/../move-stdlib/doc/string.md#0x1_string_String">string::String</a>
): u64
</code></pre>

<a id="ufc_strike_packs_get_slots_count"></a>

## Function `get_slots_count`

Get the number of slots in the pack distribution.

<pre><code><b>public</b> <b>fun</b> <a href="packs.md#ufc_strike_packs_get_slots_count">get_slots_count</a>(
    _creator_addr: <b>address</b>,
    pack_name: <a href="../../aptos-framework/../aptos-stdlib/../move-stdlib/doc/string.md#0x1_string_String">string::String</a>
): u64
</code></pre>

<a id="ufc_strike_packs_get_slot_collections_names"></a>

## Function `get_slot_collections_names`

Get collections names in a specific slot.

<pre><code><b>public</b> <b>fun</b> <a href="packs.md#ufc_strike_packs_get_slot_collections_names">get_slot_collections_names</a>(
    _creator_addr: <b>address</b>,
    pack_name: <a href="../../aptos-framework/../aptos-stdlib/../move-stdlib/doc/string.md#0x1_string_String">string::String</a>,
    slot: u64,
    use_reserved_distribution: bool
): <a href="../../aptos-framework/../aptos-stdlib/../move-stdlib/doc/vector.md#0x1_vector">vector</a>&lt;<a href="../../aptos-framework/../aptos-stdlib/../move-stdlib/doc/string.md#0x1_string_String">string::String</a>&gt;
</code></pre>

<a id="ufc_strike_packs_get_slot_collection_quantity_by_name"></a>

## Function `get_slot_collection_quantity_by_name`

Get collection quantity in a specific collection.

<pre><code><b>public</b> <b>fun</b> <a href="packs.md#ufc_strike_packs_get_slot_collection_quantity_by_name">get_slot_collection_quantity_by_name</a>(
    _creator_addr: <b>address</b>,
    pack_name: <a href="../../aptos-framework/../aptos-stdlib/../move-stdlib/doc/string.md#0x1_string_String">string::String</a>,
    slot: u64,
    collection_name: <a href="../../aptos-framework/../aptos-stdlib/../move-stdlib/doc/string.md#0x1_string_String">string::String</a>,
    use_reserved_distribution: bool
): u64
</code></pre>

<a id="ufc_strike_packs_get_slot_moments_count"></a>

## Function `get_slot_moments_count`

Get moments available in a specific slot.

<pre><code><b>public</b> <b>fun</b> <a href="packs.md#ufc_strike_packs_get_slot_moments_count">get_slot_moments_count</a>(
    _creator_addr: <b>address</b>,
    pack_name: <a href="../../aptos-framework/../aptos-stdlib/../move-stdlib/doc/string.md#0x1_string_String">string::String</a>,
    slot: u64,
    use_reserved_distribution: bool
): u64
</code></pre>

<a id="ufc_strike_packs_get_total_moments_count"></a>

## Function `get_total_moments_count`

Get total moments across all slots.

<pre><code><b>public</b> <b>fun</b> <a href="packs.md#ufc_strike_packs_get_total_moments_count">get_total_moments_count</a>(
    _creator_addr: <b>address</b>,
    pack_name: <a href="../../aptos-framework/../aptos-stdlib/../move-stdlib/doc/string.md#0x1_string_String">string::String</a>,
    use_reserved_distribution: bool
): u64
</code></pre>

<a id="ufc_strike_packs_get_collection_serial_numbers"></a>

## Function `get_collection_serial_numbers`

Get serial numbers for a specific collection in a pack.

<pre><code><b>public</b> <b>fun</b> <a href="packs.md#ufc_strike_packs_get_collection_serial_numbers">get_collection_serial_numbers</a>(
    _creator_addr: <b>address</b>,
    pack_name: <a href="../../aptos-framework/../aptos-stdlib/../move-stdlib/doc/string.md#0x1_string_String">string::String</a>,
    collection_name: <a href="../../aptos-framework/../aptos-stdlib/../move-stdlib/doc/string.md#0x1_string_String">string::String</a>
): <a href="../../aptos-framework/../aptos-stdlib/../move-stdlib/doc/vector.md#0x1_vector">vector</a>&lt;u32&gt;
</code></pre>

<a id="ufc_strike_packs_get_collection_serial_numbers_count"></a>

## Function `get_collection_serial_numbers_count`

Get count of serial numbers for a specific collection in a pack.

<pre><code><b>public</b> <b>fun</b> <a href="packs.md#ufc_strike_packs_get_collection_serial_numbers_count">get_collection_serial_numbers_count</a>(
    _creator_addr: <b>address</b>,
    pack_name: <a href="../../aptos-framework/../aptos-stdlib/../move-stdlib/doc/string.md#0x1_string_String">string::String</a>,
    collection_name: <a href="../../aptos-framework/../aptos-stdlib/../move-stdlib/doc/string.md#0x1_string_String">string::String</a>
): u64
</code></pre>

<a id="ufc_strike_packs_get_event_collection_name"></a>

## Function `get_event_collection_name`

Get collection name from MomentDrawnEvent.

<pre><code><b>public</b> <b>fun</b> <a href="packs.md#ufc_strike_packs_get_event_collection_name">get_event_collection_name</a>(event: &<a href="packs.md#ufc_strike_packs_MomentDrawnEvent">MomentDrawnEvent</a>): <a href="../../aptos-framework/../aptos-stdlib/../move-stdlib/doc/string.md#0x1_string_String">string::String</a>
</code></pre>

<a id="ufc_strike_packs_get_event_serial_number"></a>

## Function `get_event_serial_number`

Get serial number from MomentDrawnEvent.

<pre><code><b>public</b> <b>fun</b> <a href="packs.md#ufc_strike_packs_get_event_serial_number">get_event_serial_number</a>(event: &<a href="packs.md#ufc_strike_packs_MomentDrawnEvent">MomentDrawnEvent</a>): u32
</code></pre>