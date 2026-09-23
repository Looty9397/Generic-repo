// Author: Looty9397
// iykyk

//import java.util.*;

public class FartCanisters {
    public static void main(String[] args) {
        System.out.println("Welcome");

        int[] nums;
        nums = new int[5];

        nums[0] = 3;
        System.out.println(nums + " " + nums.length + " " + nums[0] + " " + nums[2]);

        String[] names = new String[3];
        System.out.println(names + " " + names[0]);
        names[2] = "Looty";
        System.out.println(names + " " + names[2]);

        double[] points = {2, 5.1, 3, 8, 12};
        System.out.println(points + " " + points.length + " " + points[3] + " " + points[points.length - 1]);

        points[points.length - 1] *= 2;
        System.out.println(points[points.length - 1]);

        System.out.println(names[names.length - 1]);
        //names[names.length - 1] *= 2;
    }
}