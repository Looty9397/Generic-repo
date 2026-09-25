// Author: Looty9397

public class WindCharge extends Item {
    public WindCharge () {
        this(64);
    }

    public WindCharge (int s) {
        super(s, "wind charge", new boolean[]{false, true});
        this.doRightAction();
    }

    public void rightAction () {
        if (this.getSt() > 0) {
            System.out.println("Threw Wind Charge");
            this.setSt(this.getSt() - 1);
        } else {
            System.out.println("Could not throw Wind Charge: out of stock");
        }
    }
}
