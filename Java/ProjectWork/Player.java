import java.util.*;

public class Player extends Character {
    private ArrayList<Item> inventory;
    private int honor;

    public Player (String n, String g) {
        super(n, g, 5, 5, 100);
        this.honor = 10;
    }

    public int getHonor () {
        return this.honor;
    }

    public void setHonor (int newVal) {
        this.honor = newVal;
    }

    public String toString () {
        return "Player " + super.toString() + String.format("\n  Honor: %d\n  Inventory: %s", this.honor, inventory.toString());
    }

    public int getMoney () {
        int totalMoney = 0;
        
        for (int i = 0; i < this.inventory.size(); i++) {
            if (this.inventory.get(i) instanceof Coin) {
                totalMoney += this.inventory.get(i).getMoney;
                this.inventory.remove(i);
                i--;
            }
        }

        this.inventory.add(new Coin (totalMoney));

        return totalMoney;
    }

    public int getInvValue () {
        int totalValue = 0;

        for (Item i: this.inventory) {
            totalValue += i.getValue();
        }

        return totalValue;
    }
}