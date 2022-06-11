package ch04;

public class MyBinaryTreeTest {

	public static void main(String[] args) {
		MyBinaryTree bTree = new MyBinaryTree();
		
		bTree.addElement(new Student(10, "������"));
		bTree.addElement(new Student(5, "�����"));
		bTree.addElement(new Student(1, "�ǹμ�"));
		bTree.addElement(new Student(7, "���¿�"));
		bTree.addElement(new Student(12, "������"));
		bTree.addElement(new Student(14, "������2"));
		
		System.out.println("preorder--------------------------");
		bTree.preorder(bTree.getRoot());
		System.out.println("inorder--------------------------");
		bTree.inorder(bTree.getRoot());
		System.out.println("postorder--------------------------");
		bTree.postorder(bTree.getRoot());
		
	}

}
