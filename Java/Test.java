public class Test {
    private String topic;
    private int minutes;

    public Test (String startTopic, int startMinutes) {
        this.topic = startTopic;
        this.minutes = startMinutes;
    }

    public Test () {
        this("Math", 0);
    }

    public boolean isLongSession () {
        return this.minutes >= 45;
    }

    public String tag () {
        return this.topic.substring(0, 3);
    }

    public void addMinutes (int extra) {
        if (extra > 0 && this.minutes + extra <= 120) {
            this.minutes += extra;
        }
    }
}