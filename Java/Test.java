
public class Test {
    public static void main(String[] args) {
        int[] one = {5, 2, 7};
        int[] two = {5, 0, 7};
        boolean isPositive = true;

        for (int i: one) {
            if (!(i > 0)) {
                isPositive = false;
            }
        }

        System.out.println(isPositive);

        for (int i: two) {
            if (!(i > 0)) {
                isPositive = false;
            }
        }
        System.out.println(isPositive);
    }
}