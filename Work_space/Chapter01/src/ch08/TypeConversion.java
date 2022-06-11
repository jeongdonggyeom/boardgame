package ch08;

public class TypeConversion {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		double dnum = 1.2;
		float fnum = 0.9F;
		
		int inum = (int)dnum + (int)fnum;
		System.out.println(inum);
		int lnum = (int)(dnum + fnum);
		System.out.println(lnum);
	}

}
