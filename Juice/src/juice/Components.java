package juice;

import java.util.ArrayList;

class Components {

    ArrayList<String> c;

    public Components() {
        c = new ArrayList<String>();
    }

    public void setComponents(ArrayList<String> ar) {
        c.addAll(ar);
    }

    public ArrayList<String> getComponents() {
        return c;
    }

    public int getSize() {
        return c.size();
    }

    public boolean equalsComponents(ArrayList<Components> ar) {
        for (Components cc : ar) {
            if (c.containsAll(cc.getComponents()) && cc.getComponents().size() == c.size()) {
                return true;
            } 
        }
        return false;
    }
    
    public boolean containsComponents(Components cc) {
        boolean tf = true;
        int i = 0;
        for (String s : cc.getComponents()) {
            if (!s.equals(c.get(i))) tf = false;
            i++;
        }
        return tf;
    }
}
