// Author: Looty9397

public class Potion extends Item {
    private String ef;
    private boolean ext;
    private int lvl;

    public Potion () {
        this("awkward", 1, false);
    }

    public Potion (String e, int l, boolean x) {
        super(1, String.format("%spotion of %s%s", (x) ? "extended " : "", e, (l > 1) ? " " + Item.toRoman(l) : ""), new boolean[]{false, true});
        this.ef = e;
        this.ext = x;
        this.lvl = l;
        this.doRightAction();
    }

    public void rightAction () {
        if (this.getSt() > 0) {
            System.out.println("Threw Potion");
            this.setSt(this.getSt() - 1);
        } else {
            System.out.println("Could not throw Potion: out of stock");
        }
    }
}
