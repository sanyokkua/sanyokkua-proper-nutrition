package com.kostenko.pp.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.commons.io.FileUtils;
import org.springframework.core.io.ClassPathResource;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@RestController
public class LanguageController {

    @GetMapping("/lang/{lang}")
    public Map<String, String> getTranslations(@PathVariable String lang) throws IOException {
        File file = new ClassPathResource("./translations/" + lang + ".json").getFile();
        String JSON_SOURCE = FileUtils.readFileToString(file, "UTF-8");
        Map<String, String> result = new ObjectMapper().readValue(JSON_SOURCE, HashMap.class);
        return result;
    }
}
