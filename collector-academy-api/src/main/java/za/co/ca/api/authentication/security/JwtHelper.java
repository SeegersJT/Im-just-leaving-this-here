package za.co.ca.api.authentication.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import za.co.ca.api.authentication.props.AuthenticationProps;
import za.co.ca.api.common.models.Employee;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import java.util.function.Function;

/**
 * @author Hanno Seegers
 */
@Component
@RequiredArgsConstructor
public class JwtHelper {

    private final AuthenticationProps authProps;

    public <T> T extractClaims(String jwt , Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(jwt);
        return claimsResolver.apply(claims);
    }

    public String extractUsername(String jwt) {
        return extractClaims(jwt , Claims::getSubject);
    }

    public String generateAccessToken(UserDetails userDetails) {
        Map<String , Object> claims = new HashMap<>();

        claims.put("role", ((Employee) userDetails).getEmployeeType().getEmployeeType());
        claims.put("role_no", ((Employee) userDetails).getEmployeeType().getEmployeeTypeNo());
        claims.put("employee_no", ((Employee) userDetails).getEmployeeNo());
        claims.put("branch_no", ((Employee) userDetails).getBranch().getBranchNo());
        claims.put("name", ((Employee) userDetails).getName());
        claims.put("surname", ((Employee) userDetails).getSurname());
        claims.put("id_number", hashID(((Employee) userDetails).getIdNumber()));
        claims.put("email_address", ((Employee) userDetails).getEmailAddress());
        claims.put("mobile_number", ((Employee) userDetails).getMobileNumber());
        claims.put("gender", ((Employee) userDetails).getGender().getGender());

        return doGenerateAccessToken(claims, userDetails.getUsername());

    }
    public String generateRefreshToken(UserDetails userDetails) {
        return doGenerateRefreshToken(userDetails.getUsername());
    }

    private String doGenerateRefreshToken(String username) {
        return Jwts.builder()
                .setSubject("#refresh" + username)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000L * 60 * 60 * 24 * 30))
                .setId(UUID.randomUUID().toString())
                .signWith(getSignInKey() , SignatureAlgorithm.HS256)
                .compact();
    }

    public String doGenerateAccessToken(Map<String, Object> claims, String subject) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 9))
                .setId(UUID.randomUUID().toString())
                .signWith(getSignInKey(), SignatureAlgorithm.HS256)
                .compact();
    }


    public Boolean isTokenValid(String jwt , UserDetails userDetails){
        final String username = extractUsername(jwt);
        return (username.equals(userDetails.getUsername())) && !isJwtExpired(jwt);
    }

    public Boolean isRefreshTokenValid(String jwt , UserDetails userDetails){
        final String username = extractUsername(jwt).substring(8);
        return (username.equals(userDetails.getUsername())) && !isJwtExpired(jwt);
    }

    private boolean isJwtExpired(String jwt) {
        return extractExpiration(jwt).before(new Date());
    }

    private Date extractExpiration(String jwt) {
        return extractClaims(jwt , Claims::getExpiration);
    }

    private Claims extractAllClaims(String jwt) {
        return Jwts
                .parserBuilder()
                .setSigningKey(getSignInKey())
                .build()
                .parseClaimsJws(jwt)
                .getBody();
    }

    private Key getSignInKey() {
        byte [] keyBytes = Decoders.BASE64.decode(authProps.SECRET_ENCRYPTION_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    private String hashID(String idNumber) {
        String maskedId = idNumber.substring(0, 9).replaceAll(".", "*")
                + idNumber.substring(9);

        return maskedId;
    }
}
