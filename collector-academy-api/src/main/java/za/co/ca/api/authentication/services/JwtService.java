package za.co.ca.api.authentication.services;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;
import za.co.ca.api.common.exceptions.DataNotFoundException;
import za.co.ca.api.common.models.Employee;
import za.co.ca.api.authentication.payloads.responses.AuthenticatedResponse;
import za.co.ca.api.authentication.payloads.responses.GeneralAPIResponse;
import za.co.ca.api.authentication.payloads.responses.RefreshTokenResponse;
import za.co.ca.api.authentication.security.JwtHelper;
import za.co.ca.api.common.services.EmployeeService;

/**
 * @author Hanno Seegers
 */
@Service
@RequiredArgsConstructor
public class JwtService {

    private final JwtHelper jwtHelper;
    private final UserDetailsService userDetailsService;
    private final EmployeeService employeeService;

    public AuthenticatedResponse generateJwtToken(Employee employee) {
        String myAccessToken = jwtHelper.generateAccessToken(employee);
        String myRefreshToken = jwtHelper.generateRefreshToken(employee);

        return AuthenticatedResponse.builder()
                .access_token(myAccessToken)
                .refresh_token(myRefreshToken)
                .build();
    }

    public ResponseEntity<?> generateAccessTokenFromRefreshToken(String refreshToken) {
        if (refreshToken != null) {
            try {
                String username = jwtHelper.extractUsername(refreshToken);

                if (username.startsWith("#refresh")) {
                    String finalUserName = username.substring(8);

                    UserDetails userDetails = userDetailsService.loadUserByUsername(finalUserName);
                    Employee employee = employeeService.findByUsername(finalUserName);

                    if (jwtHelper.isRefreshTokenValid(refreshToken, userDetails)) {
                        String accessToken = jwtHelper.generateAccessToken(userDetails);

                        RefreshTokenResponse refreshTokenResponse = RefreshTokenResponse.builder()
                                .access_Token(accessToken)
                                .name(employee.getName())
                                .surname(employee.getSurname())
                                .username(employee.getUsername())
                                .role(employee.getEmployeeType().getEmployeeType().toString())
                                .build();

                        return new ResponseEntity<>(refreshTokenResponse, HttpStatus.OK);
                    } else {
                        return new ResponseEntity<>(GeneralAPIResponse.builder().message("Refresh token is expired").build(), HttpStatus.BAD_REQUEST);
                    }
                } else {
                    return new ResponseEntity<>(GeneralAPIResponse.builder().message("Invalid refresh token").build() , HttpStatus.BAD_REQUEST);
                }
            } catch (IllegalArgumentException | MalformedJwtException e) {
                return new ResponseEntity<>(GeneralAPIResponse.builder().message("Invalid refresh token").build() , HttpStatus.BAD_REQUEST);
            } catch (DataNotFoundException e) {
                return new ResponseEntity<>(GeneralAPIResponse.builder().message("Employee not found").build() , HttpStatus.NOT_FOUND);
            } catch (ExpiredJwtException e) {
                return new ResponseEntity<>(GeneralAPIResponse.builder().message("Refresh token is expired").build() , HttpStatus.BAD_REQUEST);
            }
        } else {
            return new ResponseEntity<>(GeneralAPIResponse.builder().message("Refresh token is null").build() , HttpStatus.BAD_REQUEST);
        }

    }

}
