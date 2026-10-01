import java.util.*;

public class Character {
    private String gender;
    private int str;
    private int spd;
    private int hp;
    private String name;

    public Character (String n, String g) {
        this(n, g, 5, 5, 100);
    }

    public Character (String n, String g, int st, int sp, int hp) {
        this.gender = g;
        this.str = st;
        this.spd = sp;
        this.hp = hp;
        this.name = n;
    }

    public String getGender () {
        return this.gender;
    }

    public int getStr () {
        return this.str;
    }

    public int getSpd () {
        return this.spd;
    }

    public int getHp () {
        return this.hp;
    }

    public String getName () {
        return this.name;
    }

    public void setStr (int newVal) {
        this.str = newVal;
    }

    public void setSpd (int newVal) {
        this.spd = newVal;
    }

    public void setHp (int newVal) {
        this.hp = newVal;
    }

    public String toString () {
        return String.format("%s (%s)\n  STR: %d\n  SPD: %d\n  HP:  %d", this.name, this.gender, this.str, this.spd, this.hp);
    }
}
