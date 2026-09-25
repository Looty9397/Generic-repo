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
        }
    }

    public void doLeftAction () {
        if (this.act[0]) {
            this.leftAction();
        }
    }

    public void rightAction () {}
    public void leftAction () {}
}
