package ch04;

public class MyBinaryTree implements IBinaryTree{

	private MyTreeNode root;
	private int count;
	
	@Override
	public void addElement(Student student) {
		MyTreeNode newNode = new MyTreeNode(student);
		if(root == null) {
			root = newNode;
			System.out.println(student.getName()+" �߰�");
			return ;
		}
		MyTreeNode temp = root;
		while(true) {
			if(student.getNumber() > temp.getStudent().getNumber()) {
				if(temp.right == null) {
					temp.right = newNode;
					break;
				}
				temp = temp.right;
			}
			else {
				if(temp.left == null) {
					temp.left = newNode;
					break;
				}
				temp = temp.left;
			}
		}
		System.out.println(student.getName()+" �߰�");
		count++;
	}

	@Override
	public void removeElement(int number) {
		
	}

	@Override
	public void selectElement(int number) {
		
	}

	@Override
	public MyTreeNode getRoot() {
		return root;
	}

	@Override
	public void preorder(MyTreeNode node) {
		if(node != null) {
			node.getStudent().showInfo();
			preorder(node.left);
			preorder(node.right);
		}
	}

	@Override
	public void inorder(MyTreeNode node) {
		if(node != null) {
			inorder(node.left);
			node.getStudent().showInfo();
			inorder(node.right);
		}
	}

	@Override
	public void postorder(MyTreeNode node) {
		if(node != null) {
			postorder(node.left);
			postorder(node.right);
			node.getStudent().showInfo();
		}
	}
	
}
