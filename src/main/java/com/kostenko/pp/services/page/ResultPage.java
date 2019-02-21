package com.kostenko.pp.services.page;

import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.function.Function;
import java.util.stream.Collectors;

@Data
@Slf4j
public class ResultPage<T> {
    private int currentPage;
    private int totalPages;
    private List<T> content;

    public ResultPage(int currentPage, int totalPages, List<T> content) {
        this.currentPage = currentPage;
        this.totalPages = totalPages;
        this.content = content;
    }

    public static <T, R> ResultPage<R> getResultPage(Page<T> page, Function<T, R> mapperFunction) {
        int currentPage = page.getNumber() + 1;
        log.info("Page number in page object: {}, and corrected page: {}", page.getNumber(), currentPage);
        int totalPages = page.getTotalPages();
        log.info("Total pages: {}", totalPages);
        List<R> content = page.get().map(mapperFunction).collect(Collectors.toList());
        page.stream().findFirst().ifPresent(t -> log.info("Type for converting from: {}", t.getClass().getSimpleName()));
        content.stream().findFirst().ifPresent(t -> log.info("Type for converting to: {}", t.getClass().getSimpleName()));
        return new ResultPage<>(currentPage, totalPages, content);
    }
}
