public class Test {
    public static void main(String[] args) {
        GamePlayer q = new GamePlayer();
        GamePlayer p = new BonusPlayer();

        System.out.println(((BonusPlayer)p).bonus());
        // This line is a runtime error.
        System.out.println(((BonusPlayer)q).bonus());
    }
}

class GamePlayer {
    public int points () {return 10;}
}

class BonusPlayer extends GamePlayer {
    public int points () {return 15;}
    public int bonus () {return 5;}
}