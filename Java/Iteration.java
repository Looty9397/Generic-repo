
public class Iteration {
    public static void main(String[] args) {
        int[][] a = new int[(int)(Math.random() * 10) + 1][(int)(Math.random() * 10) + 1];

        for (int i = 0; i < a.length; i++) {
            for (int j = 0; j < a[i].length; j++) {
                a[i][j] = i * j;
            }
        }

        for (int i = 0; i < a.length; i++) {
            for (int j = 0; j < a[i].length; j++) {
                System.out.println(a[i][j] + " " + i + " " + j);
            }
        }
    }

    public static int[][] q2 () {
        int[][] mat = {
            {1, 2, 3},
            {4, 5, 6},
            {7, 8, 9}
        };

        for (int i = 0; i < mat.length; i++) {
            for (int j = 0; j < i; j++) {
                mat[i][j] = mat[j][i];
            }
        }

        return mat;
    }

    public static int q3 () {
        int total = 0;
        
        for (int i = 0; i < 3; i++) {
            for (int j = 0; j < 3; j++) {
                if (i + j == 2) {
                    break;
                }
                total++;
            }
        }

        return total;
    }

    //public static q4 () {

    //}
}
