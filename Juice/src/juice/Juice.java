package juice;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.PrintStream;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Scanner;
import java.util.StringTokenizer;

public class Juice {

    private ArrayList<String> allFruits;
    private ArrayList<String> allSortFruits;
    private ArrayList<Components> juices;
    int washNumber;

    public Juice() {
        allFruits = new ArrayList<String>();
        allSortFruits = new ArrayList<String>();
        juices = new ArrayList<Components>();
        washNumber = 0;
    }

    public void getAllFruits(String path) throws FileNotFoundException {
        Scanner sc = new Scanner(new FileInputStream(path));
        String s = null;
        while (sc.hasNext()) {
            StringTokenizer st = new StringTokenizer(sc.next());
            while (st.hasMoreTokens()) {
                s = st.nextToken();
                if (!allFruits.contains(s)) {
                    allFruits.add(s);
                    allSortFruits.add(s);
                }
            }
        }
    }

    public void getJuices(String path) throws FileNotFoundException {
        Scanner sc = new Scanner(new FileInputStream(path));
        StringTokenizer st;
        ArrayList<String> ar;
        while (sc.hasNextLine()) {
            Components c = new Components();
            st = new StringTokenizer(sc.nextLine());
            ar = new ArrayList<String>();
            while (st.hasMoreTokens()) {
                ar.add(st.nextToken());
            }
            Collections.sort(ar);
            c.setComponents(ar);
            if (!c.equalsComponents(juices)) {
                juices.add(c);
            }
        }
        Collections.sort(juices, new Comp2());
    }

    public void washNumber() {
        int number = juices.size();
        int len = juices.size();
        int jj = 0;
        if (number == 1) {
            washNumber = 1;
        } else {
            for (int i = 0; i < len - 1; i++) {
                for (int j = i + 1; j < len && jj != j; j++) {
                   /* if (juices.get(j).containsComponents(juices.get(i))) {
                        number--;
                        jj = j;
                        break;
                    }*/
                    if (juices.get(j).getComponents().containsAll(juices.get(i).getComponents())) {
                        number--;
                        jj = j;
                        break;
                    }
                    if (j == i) {
                        number++;
                    }
                }
            }
        }
        washNumber = number;
    }

    public void sortFruits() {
        Collections.sort(allSortFruits, new Comp());
    }

    public void printAllFruits(String path) throws FileNotFoundException {
        PrintStream ps = new PrintStream(new FileOutputStream(path));
        for (String s : allFruits) {
            ps.println(s);
        }
        ps.close();
    }

    public void printAllSortFruits(String path) throws FileNotFoundException {
        PrintStream ps = new PrintStream(new FileOutputStream(path));
        for (String s : allSortFruits) {
            ps.println(s);
        }
        ps.close();
    }

    public void printWashNumber(String path) throws FileNotFoundException {
        PrintStream ps = new PrintStream(new FileOutputStream(path));
        ps.print(washNumber);
        ps.close();
    }
  /*  public void print() {
        for (String s : allSortFruits) {
            System.out.print(s + " ");
        }
        System.out.println();
        System.out.println();
        for (Components c : juices) {
            for (String ar : c.getComponents()) {

                System.out.print(ar + " ");
            }
            System.out.println();
        }
    }*/
}
