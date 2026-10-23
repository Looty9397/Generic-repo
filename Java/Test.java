public class Test {
    public static void main(String[] args) {
        // e
        Test test = new test2();
        test.hi();
    }

    public String hi () {
        return "hi";
    }
}

class test2 extends Test {
    @Override 
    public String hi () {
        return "hello";
    }
}