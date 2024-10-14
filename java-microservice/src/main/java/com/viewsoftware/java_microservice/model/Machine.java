package com.viewsoftware.java_microservice.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;


public class Machine {
    private String maquinaId;
    private String status;
    private List<Periodo> periodos;
   
    public Machine(String maquinaId, String status, List<Periodo> periodos) {
        this.maquinaId = maquinaId;
        this.status = status;
        this.periodos = periodos != null ? periodos : new ArrayList<>();
    }

    public String getMaquinaId() {
        return maquinaId;
    }

    public void setMaquinaId(String maquinaId) {
        this.maquinaId = maquinaId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
    
    public static class Periodo {
        private Date dataInicio;
        private Date dataFim;

        public Periodo(Date dataInicio, Date dataFim) {
            this.dataInicio = dataInicio;
            this.dataFim = dataFim;
        }

        public Date getDataInicio() {
            return dataInicio;
        }

        public void setDataInicio(Date dataInicio) {
            this.dataInicio = dataInicio;
        }

        public Date getDataFim() {
            return dataFim;
        }

        public void setDataFim(Date dataFim) {
            this.dataFim = dataFim;
        }
    }
}

