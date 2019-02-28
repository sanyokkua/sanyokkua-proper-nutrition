package com.kostenko.pp.controllers.general;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.commons.io.FileUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.core.io.ClassPathResource;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@RestController
public class LanguageController {

    @SuppressWarnings("unchecked")
    @GetMapping("/lang/{lang}")
    public Map<String, Object> getTranslations(@PathVariable String lang) {
        try {
            File file = new ClassPathResource("./translations/" + lang + ".json").getFile();
            String json = FileUtils.readFileToString(file, "UTF-8");
            return new ObjectMapper().readValue(json, HashMap.class);
        } catch (IOException e) {
            throw new RuntimeException("Applications doesn't have any language files in language folder", e);
        }
    }

    @GetMapping("/lang")
    public List<String> getLanguages() throws IOException {
        File file = new ClassPathResource("./translations/").getFile();
        if (file.isDirectory()) {
            String[] list = file.list();
            if (list != null) {
                return Stream.of(list).map(fileName -> StringUtils.remove(fileName, ".json")).collect(Collectors.toList());
            }
        }
        throw new RuntimeException("Applications doesn't have any language files in language folder");
    }
}
