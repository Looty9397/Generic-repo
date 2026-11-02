import java.io.*;
import java.util.*;

public class Nov2 {
    public static void main(String[] args) throws IOException {
        File f = new File("scores.txt");
        int total = 0; int count = 0;
        int highScore = Integer.MIN_VALUE; int lowScore = Integer.MAX_VALUE;
        String highName = ""; String lowName = "";
        String highGame = ""; String lowGame = "";

        try (Scanner input = new Scanner(f)) {
            while (input.hasNextLine()) {
                String line = input.nextLine();
                String[] split = line.split(",");

                int score = Integer.parseInt(split[2]);
                total += score;
                count++;

                if (score > highScore) {
                    highScore = score;
                    highName = split[0];
                    highGame = split[1];
                } else if (score < lowScore) {
                    lowScore = score;
                    lowName = split[0];
                    lowGame = split[1];
                }

                System.out.printf("Here is %s's score on %s: %d\n", split[0], split[1], score);
            }
        }

        System.out.println("---");
        System.out.printf("The %d score%s total to %d, with an average of %.2f\n", count, (count == 1) ? "" : "s", total, (double)total / count);
        System.out.printf("The highest scorer is %s, with a score of %d on %s\n", highName, highScore, highGame);
        System.out.printf("The lowest scorer is %s, with a score of %d on %s\n", lowName, lowScore, lowGame);
    }
}
