/*
 * Author: Looty9397 (and no one else)
 * Count amount of palindromes in a text file 
 **/

import java.io.*;
import java.util.*;

public class Project {
    public static void main(String[] args) {
        String filename = "words.txt";
        int total = 0;

        try (Scanner input = new Scanner(new File(filename))) {
            while (input.hasNext()) {
                if (isPalindrome(input.next())) {
                    total++;
                }
            }
        } catch (IOException ex) {
            System.out.println("Something went wrong\n" + ex);
        }

        System.out.printf("There are a total of %d palindromes in %s\n", total, filename);
    }

    /**
     * Determine if a string is a palindrome
     * @param s the string in question
     * @return if s is palindrome
     */
    public static boolean isPalindrome (String s) {
        // make sure it's not messed up by whitespace, letter case, or special characters
        if (!isNormal(s)) {
            s = normal(s);
        }

        // ok now we start
        if (s.length() <= 1) {
            return true;
        } else if (s.charAt(0) == s.charAt(s.length() - 1)) {
            return isPalindrome(s.substring(1, s.length() - 1));
        } else {
            return false;
        }
    }

    /**
     * normalize a string, into lowercase letters / numbers only.
     * @param s the string in question
     * @return the normalized string
     */
    public static String normal (String s) {
        String o = "";
        for (int i = 0; i < s.length(); i++) {
            if (Character.isLetterOrDigit(s.charAt(i))) {
                o += Character.toLowerCase(s.charAt(i));
            }
        }

        return o;
    }

    /**
     * determine if a string is already normalized
     * @param s the string in question
     * @return if s is normal
     */
    public static boolean isNormal (String s) {
        for (int i = 0; i < s.length(); i++) {
            if (!Character.isLetterOrDigit(s.charAt(i)) || !Character.isLowerCase(s.charAt(i))) {
                return false;
            }
        }

        return true;
    }
}
