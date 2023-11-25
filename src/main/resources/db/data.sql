/*INSERT INTO question (subject, content)
VALUES ('제목 테스트1', '내용 테스트1');*/

CREATE ALIAS loopInsert AS $$
void loopInsert(java.sql.Connection conn) throws java.sql.SQLException {
    java.sql.PreparedStatement stmt = conn.prepareStatement("INSERT INTO question(subject, content) VALUES(?, ?)");
for (int i = 1; i <= 500; i++) {
        stmt.setString(1, "제목 테스트 " + i);
        stmt.setString(2, "내용 테스트 " + i);
        stmt.executeUpdate();
}
    stmt.close();
}$$;

CALL loopInsert();