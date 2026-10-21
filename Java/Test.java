import java.util.*;

public class Test {
    public static void main(String[] args) {
        String alphabet = "abcdefghijklmnopqrstuvwxyz";

        // Program to give the user however many letters they want, up to 26
        // Get a scanner and then get the input as nextInt();
        // 

        Scanner input = new Scanner(System.in);
        int numLetters = input.nextInt();

        if (numLetters > 0 && numLetters <= 26) {
            System.out.println(alphabet.substring(0, numLetters));
        } else {
            System.out.println("Something went wrong");
        }

        input.close();
    }
}
