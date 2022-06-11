package ch04;

public interface IBinaryTree {
	void addElement(Student student);
	void removeElement(int number);
	void selectElement(int number);
	MyTreeNode getRoot();
	
	void preorder(MyTreeNode node);
	void inorder(MyTreeNode node);
	void postorder(MyTreeNode node);
	
}
