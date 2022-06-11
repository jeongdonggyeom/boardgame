package ch04;

public class MyTreeNode {
	public MyTreeNode left;
	public MyTreeNode right;
	private Student student;
	
	public MyTreeNode() {
		this.left = null;
		this.right = null;
		this.student = null;
	}
	
	public MyTreeNode(Student student) {
		this.left = null;
		this.right = null;
		this.student = student;
	}
	
	public Student getStudent() {
		return student;
	}
}
