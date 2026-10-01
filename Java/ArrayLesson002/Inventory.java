// Author: Looty9397

public class Inventory {
    private Item[] inv = new Item[27]; // Inventory, top to bottom, left to right.
    private Item[] hotbar = new Item[9]; // Hotbar, left to right.
    private Item[] gear = new Item[5]; // 0: Offhand. 1 - 4: Armor, head to feet.

    public Inventory () {
        for (int i = 0; i < inv.length; i++) {
            if (i <= 2) {
                inv[i] = new WindCharge(64);
            } else if (i <= 5) {
                inv[i] = new EnderPearl(16);
            } else if (i <= 15) {
                inv[i] = new Potion("speed", 2, false);
            } else {
                inv[i] = new Potion("strength", 2, false);
            }
        }
    }

    public Item[] getInv () {
        return this.inv;
    }

    public Item[] getHotbar () {
        return this.hotbar;
    }

    public Item[] getArmor () {
        return new Item[]{this.gear[1], this.gear[2], this.gear[3], this.gear[4]};
    }

    public Item getOffhand () {
        return this.gear[0];
    }
}
