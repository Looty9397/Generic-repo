import java.util.*;

public class AgeCheck {
    public static void main(String[] args) {
        try (Scanner input = new Scanner(System.in)) {
            System.out.print("enter your age in years: ");
            int age = input.nextInt();
            
            final int maxAge = 65;
            final int minAge = 18;
            
            System.out.println((age >= minAge && age <= maxAge) ? "age is valid" : "age is not valid");
        }
    }
}
