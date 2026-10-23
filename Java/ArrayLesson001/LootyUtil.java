// Author: Looty9397

public class LootyUtil {
    // printArray == Arrays.toString()
    /**
     * Print an array of strings
     * @param arr an array of strings
     */
    public static void printArray (Object[] arr) {
        for (int i = 0; i < arr.length; i++) {
            if (i == 0) {System.out.print("[");}
            System.out.print("\"" + arr[i] + "\"");
            if (i < arr.length - 1) {System.out.print(", ");}
            if (i == arr.length - 1) {System.out.print("]");}
        }
        System.out.print("\n");
    }
}
