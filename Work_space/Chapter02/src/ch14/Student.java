package ch14;

import java.util.ArrayList;

public class Student {

	private static int number=1117;
	private int studentnumber;
	private String name;
	private ArrayList<Subject> subjectList;
	
	public Student(String name) {
		this.name = name;
		studentnumber = number++;
		subjectList = new ArrayList<Subject>();
	}

	public void addSubject(String name, int score) {
		
		Subject subject = new Subject(name, score);
		subjectList.add(subject);
	}
	
	public void showInfo() {
		for(Subject subject : subjectList) {
			System.out.println(name+"의 "+subject.getName()+" 점수는 "+subject.getScore()+"점 입니다.");
		}
	}
}
