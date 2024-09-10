package com.api.classifybook.repository;

import com.api.classifybook.model.ABook;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface BookRepository extends MongoRepository<ABook, String> {

    <S extends ABook> S save(S entity);



    void deleteById(String id);
}
