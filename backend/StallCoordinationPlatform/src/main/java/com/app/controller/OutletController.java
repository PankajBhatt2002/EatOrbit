package com.app.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.entity.Outlet;
import com.app.repository.OutletRepository;

@RestController
@RequestMapping("/api/outlets")
public class OutletController {

    private final OutletRepository outletRepository;

    public OutletController(OutletRepository outletRepository) {
        this.outletRepository = outletRepository;
    }

    @GetMapping
    public List<Outlet> getAllOutlets() {
        return outletRepository.findAll();
    }
}

