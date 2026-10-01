// Author: Looty9397

public class EnderPearl extends Item {
    public EnderPearl () {
        this(64);
    }

    public EnderPearl (int s) {
        super(s, "ender pearl", new boolean[]{false, true});
        this.doRightAction();
    }

    public void rightAction () {
        if (this.getSt() > 0) {
            System.out.println("Threw Ender Pearl");
            this.setSt(this.getSt() - 1);
        } else {
            System.out.println("Could not throw Ender Pearl: out of stock");
        }
    }
}
