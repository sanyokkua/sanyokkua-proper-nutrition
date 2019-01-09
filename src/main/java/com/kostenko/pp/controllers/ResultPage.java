package com.kostenko.pp.controllers;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResultPage<T> {
    private int currentPage;
    private int totalPages;
    private List<T> content;
}
