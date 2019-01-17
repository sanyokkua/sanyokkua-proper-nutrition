package com.kostenko.pp.controllers;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@Slf4j
public class MainController {

    @SuppressWarnings("SameReturnValue")
    @RequestMapping(value = "/")
    public String index() {
        return "index";
    }

}
