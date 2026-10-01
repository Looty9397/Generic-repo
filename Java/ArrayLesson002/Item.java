// Author: Looty9397

public class Item {
    int st;
    String ty;
    boolean[] act = new boolean[2];

    public Item () {
        this(0, "", new boolean[2]);
    }

    public Item (int s, String t) {
        this(s, t, new boolean[2]);
    }

    public Item (int s, String t, boolean[] a) {
        this.st = s;
        this.ty = t;
        this.act = a;
    }

    public int getSt () {
        return this.st;
    }

    public String getTy () {
        return this.ty;
    }

    public void setSt (int s) {
        this.st = s;
    }

    // No mutator for ty because we don't have creative

    public String toString () {
        return String.format("%d %ss", this.st, this.ty);
    }

    public void doRightAction () {
        if (this.act[1]) {
            this.rightAction();
        } else {
            System.out.printf("%s has no right-click action.", this.ty);
        }
    }

    public void doLeftAction () {
        if (this.act[0]) {
            this.leftAction();
        } else {
            System.out.printf("%s has no left-click action.", this.ty);
        }
    }

    public void rightAction () {}
    public void leftAction () {}

    public static String toRoman (int num) {
        String[] numerals = {"M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"};
        int[] values = {1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1};
        String out = "";

        for (int i = 0; i < values.length; i++) {
            if (num >= values[i]) {
                while (num >= values[i]) {
                    num -= values[i];
                    out += numerals[i];
                }
            }
        }

        return out;
    }

}
