import java.util.ArrayList;
import java.util.List;

public class ArrayListDemo {
    public static void main(String[] args) {
        // ArrayList implementa List, que extende collections
        List<Integer> l1 = new ArrayList<Integer>();
        l1.add(2);
        l1.add(1);
        System.out.println("l1: " + l1);

        List<Integer> l2 = new ArrayList<Integer>();
        l2.add(0, 10);
        l2.add(1, 5);
        System.out.println("l2: " + l2);

        l1.addAll(l2);
        System.out.println("l1 + l2: " + l1);

        l1.remove(2);
        System.out.println("l1 - index(2): " + l1);

        System.out.println("l1 contém `2`?: " + l1.contains(2));

        System.out.println("l1 contém l2?: " + l1.containsAll(l2));

        System.out.println("l1, index 1: " + l1.get(1));

        l1.set(2, 4);
        System.out.println("l1, index 2, set to `4`: " + l1);

        l1.add(1, 3);
        System.out.println("l1, add to index 1: " + l1);

        List<String> l3 = new ArrayList<String>();
        l3.add("One");
        l3.add("Two");
        l3.add("Three");
        System.out.println("l3: " + l3);

        l3.remove("Three");
        System.out.println("Remove o elemento `Three`: " + l3);

        System.out.println("l1 size: " + l1.size());

        System.out.println("indexOf `3` em l1: " + l1.indexOf(3));

        List<Integer> l4 = new ArrayList<Integer>();
        l4.addAll(l1);

        System.out.println("l4 == l1 ? :" + l4.equals(l1));

        for (int alEl : l1) {
            System.out.println(alEl);
        }
    }
}
