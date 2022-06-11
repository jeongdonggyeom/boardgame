package ch03;

import java.util.ArrayList;

public class AnimalTest {

	public static void main(String[] args) {
		
		ArrayList<Animal> animalList = new ArrayList<>();
		
		Animal pAnimal = new Person();
		Animal tAnimal = new Tiger();
		Animal eAnimal = new Eagle();
		
		pAnimal.move();
		tAnimal.move();
		eAnimal.move();
		System.out.println("----------------------------------------");
		
		animalList.add(pAnimal);
		animalList.add(tAnimal);
		animalList.add(eAnimal);
		
		for(Animal animal : animalList) {
			animal.move();
		}
	}

}
