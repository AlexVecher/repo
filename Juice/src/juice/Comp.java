package juice;

import java.util.Comparator;

public class Comp implements Comparator <String>{
    @Override
    public int compare (String a, String b) {
        return a.compareTo(b);
    }
}
