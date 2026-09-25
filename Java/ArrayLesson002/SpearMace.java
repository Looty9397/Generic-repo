// Author: Looty9397

import java.util.*;

public class SpearMace {
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        int bN = 0;

        System.out.println("Pick a number (max 36, min 1)");
        while (bN < 1 || bN > 64) {
            System.out.print("> ");
            if (in.hasNextInt()) {
                bN = in.nextInt();
            } else {
                in.nextLine();
            }
        }

        Item[] inv = new Item[bN];
        for (int i = 0; i < bN; i++) {
            inv[i] = new WindCharge(32);
        }

        System.out.println(Arrays.toString(inv));

        int total = 0;
        for (int i = 0; i < inv.length; i++) {
            total += inv[i].getSt();
        }
        System.out.printf("Total of %d items in your inventory\n", total);

        in.close();
    }
}