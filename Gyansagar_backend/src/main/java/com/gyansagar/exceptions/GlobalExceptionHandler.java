package com.gyansagar.exceptions;

import com.gyansagar.dto.ErrorDto;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
@RestController
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler({NotFoundException.class})
    public final ResponseEntity handleNotFountExceptions(Exception ex, WebRequest request) {
        ErrorDto response = new ErrorDto(ex.getMessage());
        return new ResponseEntity(response, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(DuplicateEntryException.class)
    public final ResponseEntity handleDuplicateExceptions(Exception ex, WebRequest request) {
        ErrorDto response = new ErrorDto(ex.getMessage());
        return new ResponseEntity(response, HttpStatus.CONFLICT);
    }

    @ExceptionHandler(BadRequestException.class)
    public final ResponseEntity handleBadRequestException(Exception ex, WebRequest request) {
        ErrorDto response = new ErrorDto(ex.getMessage());
        return new ResponseEntity(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler({InternalServerError.class, DatabaseException.class})
    public final ResponseEntity handleInternalServerError(Exception ex, WebRequest request) {
        ErrorDto response = new ErrorDto(ex.getMessage());
        return new ResponseEntity(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(
        MethodArgumentNotValidException ex, HttpHeaders headers, HttpStatus status, WebRequest request) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });

        ErrorDto response = new ErrorDto(ex.getMessage());

        return handleExceptionInternal(ex, response, headers, status, request);
    }

}