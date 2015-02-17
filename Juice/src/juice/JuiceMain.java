package juice;

import java.io.FileNotFoundException;

public class JuiceMain {

    public static void main(String[] args) throws FileNotFoundException {
        Juice j = new Juice();
        j.getAllFruits("juice.txt");
        j.sortFruits();
        j.printAllFruits("juice1.txt");
        j.printAllSortFruits("juice2.txt");
        j.getJuices("juice.txt");
        j.washNumber();
        j.printWashNumber("juice3.txt");
    }

}
