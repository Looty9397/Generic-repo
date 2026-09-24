// Author: Looty9397
// iykyk

import java.util.*;

public class CartFanisters {
    public static void main(String[] args) {
        String[] names = {"Nikhil", "Lucas", "Arhama", "Keniel", "Emilia"};

        /*
        System.out.println(names[0]);
        System.out.println(names[1]);
        System.out.println(names[2]);
        System.out.println(names[3]);
        System.out.println(names[4]);
        */

        // Loop control variables - scope limited to the loop
        for (String i: names) {
            System.out.println(i);
        }

        // Both are effectively the same
        LootyUtil.printArray(names);
        System.out.println(Arrays.toString(names));
    }
}
