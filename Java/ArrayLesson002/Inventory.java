// Author: Looty9397

public class Inventory {
    private Item[] inv;
    private Item[] hotbar;
    private Item[] armor;
    private Item offhand;

    public Inventory () {
        inv = new Item[27];
        hotbar = new Item[9];
        armor = new Item[4];
    }

    public Item getInv (int slot) {
        if (slot >= 0 && slot < this.inv.length) {
            return this.inv[slot];
        } else {
            System.out.println(String.format("Failed to access inventory slot %d: slot does not exist", slot));
            return null;
        }
    }

    
}
