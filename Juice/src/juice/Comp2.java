package juice;

import java.util.Comparator;

public class Comp2 implements Comparator<Components> {
    @Override
    public int compare(Components a, Components b) {
        return a.getSize() - b.getSize();
    }
}
