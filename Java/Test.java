
public class Test {
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
}
