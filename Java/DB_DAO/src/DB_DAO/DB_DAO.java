package DB_DAO;

public class DB_DAO {
	private Connection conn;
	private PreparedStatement pstmt;
	private ResultSet rs;
}
	
	public DB_DAO() {
		try {
			String url = "jdbc:mysql://localhost:3306/xi_jinping";
			String id = "root";
			String pw = "jungdonggyem";
			
			Class.forName("com.mysql.jdbc.Driver");
			conn = DriverManager.getConnection(url,id,pw);
			System.out.println("db 연동 성공");
		}catch(Exception e) {
			System.out.println("db 연동 실패");
			e.printStackTrace();
		}
	}
