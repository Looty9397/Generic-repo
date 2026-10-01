import java.util.*;

public class NPC extends Character {
    private String[] dialogue;

    public NPC (String n, String g, String[] dia) {
        this(n, g, 5, 5, 100, dia);
    }

    public NPC (String n, String g, int st, int sp, int hp, String[] dia) {
        super(n, g, st, sp, hp);
        this.dialogue = dia;
    }

    public void speak (int dia) {
        System.out.println(this.dialogue[dia]);
    }

    public String[] getDialogue () {
        return dialogue;
    }

    public String toString () {
        return "NPC " + super.toString();
    }
}
