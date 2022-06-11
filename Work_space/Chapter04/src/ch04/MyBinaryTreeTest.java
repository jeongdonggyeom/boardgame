package ch04;

public class MyBinaryTreeTest {

	public static void main(String[] args) {
		MyBinaryTree bTree = new MyBinaryTree();
		
		bTree.addElement(new Student(10, "춘향이"));
		bTree.addElement(new Student(5, "향단이"));
		bTree.addElement(new Student(1, "권민서"));
		bTree.addElement(new Student(7, "서태영"));
		bTree.addElement(new Student(12, "이현준"));
		bTree.addElement(new Student(14, "이현준2"));
		
		System.out.println("preorder--------------------------");
		bTree.preorder(bTree.getRoot());
		System.out.println("inorder--------------------------");
		bTree.inorder(bTree.getRoot());
		System.out.println("postorder--------------------------");
		bTree.postorder(bTree.getRoot());
		
	}

}
